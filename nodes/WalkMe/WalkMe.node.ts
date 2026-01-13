/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

// Description imports
import { userOperations, userFields } from './actions/user/user.description';
import { endUserOperations, endUserFields } from './actions/endUser/endUser.description';
import { contentOperations, contentFields } from './actions/content/content.description';
import { analyticsOperations, analyticsFields } from './actions/analytics/analytics.description';
import { multiLanguageOperations, multiLanguageFields } from './actions/multiLanguage/multiLanguage.description';
import { discoveryOperations, discoveryFields } from './actions/discovery/discovery.description';
import { checksumOperations, checksumFields } from './actions/checksum/checksum.description';
import { systemOperations, systemFields } from './actions/system/system.description';
import { segmentOperations, segmentFields } from './actions/segment/segment.description';
import { goalOperations, goalFields } from './actions/goal/goal.description';
import { selfHostedOperations, selfHostedFields } from './actions/selfHosted/selfHosted.description';
import { apiKeyOperations, apiKeyFields } from './actions/apiKey/apiKey.description';

// Execute imports
import { executeUserOperation } from './actions/user/user.execute';
import { executeEndUserOperation } from './actions/endUser/endUser.execute';
import { executeContentOperation } from './actions/content/content.execute';
import { executeAnalyticsOperation } from './actions/analytics/analytics.execute';
import { executeMultiLanguageOperation } from './actions/multiLanguage/multiLanguage.execute';
import { executeDiscoveryOperation } from './actions/discovery/discovery.execute';
import { executeChecksumOperation } from './actions/checksum/checksum.execute';
import { executeSystemOperation } from './actions/system/system.execute';
import { executeSegmentOperation } from './actions/segment/segment.execute';
import { executeGoalOperation } from './actions/goal/goal.execute';
import { executeSelfHostedOperation } from './actions/selfHosted/selfHosted.execute';
import { executeApiKeyOperation } from './actions/apiKey/apiKey.execute';

// Runtime licensing notice (logged once per node load)
const LICENSING_NOTICE_LOGGED = Symbol.for('walkme.licensing.logged');

function logLicensingNotice(): void {
	const globalAny = global as unknown as { [key: symbol]: boolean };
	if (!globalAny[LICENSING_NOTICE_LOGGED]) {
		console.warn(`[Velocity BPA Licensing Notice]

This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).

Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA.

For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.`);
		globalAny[LICENSING_NOTICE_LOGGED] = true;
	}
}

export class WalkMe implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'WalkMe',
		name: 'walkMe',
		icon: 'file:walkme.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with the WalkMe Digital Adoption Platform API',
		defaults: {
			name: 'WalkMe',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'walkMeApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Analytics',
						value: 'analytics',
					},
					{
						name: 'API Key',
						value: 'apiKey',
					},
					{
						name: 'Checksum',
						value: 'checksum',
					},
					{
						name: 'Content',
						value: 'content',
					},
					{
						name: 'Discovery Apps',
						value: 'discovery',
					},
					{
						name: 'End User',
						value: 'endUser',
					},
					{
						name: 'Goal',
						value: 'goal',
					},
					{
						name: 'Multi-Language',
						value: 'multiLanguage',
					},
					{
						name: 'Segment',
						value: 'segment',
					},
					{
						name: 'Self-Hosted',
						value: 'selfHosted',
					},
					{
						name: 'System',
						value: 'system',
					},
					{
						name: 'User',
						value: 'user',
					},
				],
				default: 'user',
			},
			// User operations and fields
			...userOperations,
			...userFields,
			// End User operations and fields
			...endUserOperations,
			...endUserFields,
			// Content operations and fields
			...contentOperations,
			...contentFields,
			// Analytics operations and fields
			...analyticsOperations,
			...analyticsFields,
			// Multi-Language operations and fields
			...multiLanguageOperations,
			...multiLanguageFields,
			// Discovery operations and fields
			...discoveryOperations,
			...discoveryFields,
			// Checksum operations and fields
			...checksumOperations,
			...checksumFields,
			// System operations and fields
			...systemOperations,
			...systemFields,
			// Segment operations and fields
			...segmentOperations,
			...segmentFields,
			// Goal operations and fields
			...goalOperations,
			...goalFields,
			// Self-Hosted operations and fields
			...selfHostedOperations,
			...selfHostedFields,
			// API Key operations and fields
			...apiKeyOperations,
			...apiKeyFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		// Log licensing notice once per node load
		logLicensingNotice();

		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				let result: INodeExecutionData[] = [];

				switch (resource) {
					case 'user':
						result = await executeUserOperation.call(this, operation, i);
						break;

					case 'endUser':
						result = await executeEndUserOperation.call(this, operation, i);
						break;

					case 'content':
						result = await executeContentOperation.call(this, operation, i);
						break;

					case 'analytics':
						result = await executeAnalyticsOperation.call(this, operation, i);
						break;

					case 'multiLanguage':
						result = await executeMultiLanguageOperation.call(this, operation, i);
						break;

					case 'discovery':
						result = await executeDiscoveryOperation.call(this, operation, i);
						break;

					case 'checksum':
						result = await executeChecksumOperation.call(this, operation, i);
						break;

					case 'system':
						result = await executeSystemOperation.call(this, operation, i);
						break;

					case 'segment':
						result = await executeSegmentOperation.call(this, operation, i);
						break;

					case 'goal':
						result = await executeGoalOperation.call(this, operation, i);
						break;

					case 'selfHosted':
						result = await executeSelfHostedOperation.call(this, operation, i);
						break;

					case 'apiKey':
						result = await executeApiKeyOperation.call(this, operation, i);
						break;

					default:
						throw new Error(`Unknown resource: ${resource}`);
				}

				returnData.push(...result);
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: {
							error: (error as Error).message,
						},
						pairedItem: { item: i },
					});
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
