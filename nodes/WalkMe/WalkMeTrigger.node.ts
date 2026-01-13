/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
	IWebhookFunctions,
	IDataObject,
	INodeType,
	INodeTypeDescription,
	IWebhookResponseData,
	IHookFunctions,
} from 'n8n-workflow';
import * as crypto from 'crypto';

export class WalkMeTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'WalkMe Trigger',
		name: 'walkMeTrigger',
		icon: 'file:walkme.svg',
		group: ['trigger'],
		version: 1,
		subtitle: '={{$parameter["event"]}}',
		description: 'Starts the workflow when WalkMe events occur',
		defaults: {
			name: 'WalkMe Trigger',
		},
		inputs: [],
		outputs: ['main'],
		credentials: [
			{
				name: 'walkMeApi',
				required: false,
			},
		],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'webhook',
			},
		],
		properties: [
			{
				displayName: 'Event',
				name: 'event',
				type: 'options',
				required: true,
				default: 'content.completed',
				options: [
					{
						name: 'Content Abandoned',
						value: 'content.abandoned',
						description: 'User abandoned content',
					},
					{
						name: 'Content Completed',
						value: 'content.completed',
						description: 'User completed content',
					},
					{
						name: 'Content Started',
						value: 'content.started',
						description: 'User started content',
					},
					{
						name: 'Error Occurred',
						value: 'error.occurred',
						description: 'Error was captured',
					},
					{
						name: 'Goal Achieved',
						value: 'goal.achieved',
						description: 'Goal was completed',
					},
					{
						name: 'Launcher Clicked',
						value: 'launcher.clicked',
						description: 'Launcher was clicked',
					},
					{
						name: 'Segment Entered',
						value: 'segment.entered',
						description: 'User entered segment',
					},
					{
						name: 'Segment Exited',
						value: 'segment.exited',
						description: 'User exited segment',
					},
					{
						name: 'Survey Submitted',
						value: 'survey.submitted',
						description: 'Survey response received',
					},
				],
				description: 'The event to listen for',
			},
			{
				displayName: 'Secret',
				name: 'secret',
				type: 'string',
				typeOptions: {
					password: true,
				},
				default: '',
				description: 'Shared secret for webhook verification (optional but recommended)',
			},
			{
				displayName: 'Options',
				name: 'options',
				type: 'collection',
				placeholder: 'Add Option',
				default: {},
				options: [
					{
						displayName: 'Filter by System ID',
						name: 'systemId',
						type: 'string',
						default: '',
						description: 'Only trigger for events from this system ID',
					},
					{
						displayName: 'Filter by Content ID',
						name: 'contentId',
						type: 'string',
						default: '',
						description: 'Only trigger for events related to this content ID',
					},
				],
			},
		],
	};

	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				// WalkMe webhooks are configured in the WalkMe dashboard
				// This method just returns true as we can't programmatically check
				return true;
			},
			async create(this: IHookFunctions): Promise<boolean> {
				// WalkMe webhooks are configured in the WalkMe dashboard
				// Display the webhook URL for the user to configure
				return true;
			},
			async delete(this: IHookFunctions): Promise<boolean> {
				// WalkMe webhooks are configured in the WalkMe dashboard
				return true;
			},
		},
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const req = this.getRequestObject();
		const body = this.getBodyData() as IDataObject;
		const event = this.getNodeParameter('event') as string;
		const secret = this.getNodeParameter('secret', '') as string;
		const options = this.getNodeParameter('options', {}) as IDataObject;

		// Verify signature if secret is configured
		if (secret) {
			const signature = req.headers['x-walkme-signature'] as string;
			if (signature) {
				const payload = JSON.stringify(body);
				const expectedSignature = crypto
					.createHmac('sha256', secret)
					.update(payload)
					.digest('hex');

				if (signature !== expectedSignature && signature !== `sha256=${expectedSignature}`) {
					return {
						webhookResponse: {
							status: 401,
							body: { error: 'Invalid signature' },
						},
					};
				}
			}
		}

		// Check if the event matches
		const receivedEvent = body.event as string || body.type as string;
		if (receivedEvent && receivedEvent !== event) {
			// Event doesn't match, ignore
			return {
				webhookResponse: {
					status: 200,
					body: { received: true, ignored: true, reason: 'Event type mismatch' },
				},
			};
		}

		// Apply filters if configured
		if (options.systemId) {
			const systemId = body.systemId as string || (body.data as IDataObject)?.systemId as string;
			if (systemId && systemId !== options.systemId) {
				return {
					webhookResponse: {
						status: 200,
						body: { received: true, ignored: true, reason: 'System ID mismatch' },
					},
				};
			}
		}

		if (options.contentId) {
			const contentId = body.contentId as string || (body.data as IDataObject)?.contentId as string;
			if (contentId && contentId !== options.contentId) {
				return {
					webhookResponse: {
						status: 200,
						body: { received: true, ignored: true, reason: 'Content ID mismatch' },
					},
				};
			}
		}

		// Return the webhook data
		return {
			workflowData: [
				this.helpers.returnJsonArray({
					event: receivedEvent || event,
					timestamp: body.timestamp || new Date().toISOString(),
					...body,
				}),
			],
		};
	}
}
