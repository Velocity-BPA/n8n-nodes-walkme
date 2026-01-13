/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { walkMeApiRequest, walkMeApiRequestAllItems, formatDateForApi } from '../../transport/GenericFunctions';

export async function executeSegmentOperation(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<INodeExecutionData[]> {
	let responseData: IDataObject | IDataObject[];

	switch (operation) {
		case 'list': {
			const systemId = this.getNodeParameter('systemId', i) as string;
			const returnAll = this.getNodeParameter('returnAll', i) as boolean;

			if (returnAll) {
				responseData = await walkMeApiRequestAllItems.call(this, 'GET', `/segments/v1/systems/${systemId}/segments`);
			} else {
				const limit = this.getNodeParameter('limit', i) as number;
				responseData = await walkMeApiRequestAllItems.call(this, 'GET', `/segments/v1/systems/${systemId}/segments`, undefined, undefined, limit);
			}
			break;
		}

		case 'get': {
			const segmentId = this.getNodeParameter('segmentId', i) as string;
			responseData = await walkMeApiRequest.call(this, 'GET', `/segments/v1/segments/${segmentId}`);
			break;
		}

		case 'create': {
			const systemId = this.getNodeParameter('systemId', i) as string;
			const name = this.getNodeParameter('name', i) as string;
			const rulesJson = this.getNodeParameter('rules', i) as string;
			const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

			let rules: IDataObject[];
			try {
				rules = JSON.parse(rulesJson) as IDataObject[];
			} catch {
				throw new Error('Invalid JSON in rules field');
			}

			const body: IDataObject = {
				name,
				rules,
				systemId,
				...additionalFields,
			};

			responseData = await walkMeApiRequest.call(this, 'POST', '/segments/v1/segments', body);
			break;
		}

		case 'update': {
			const segmentId = this.getNodeParameter('segmentId', i) as string;
			const updateFields = this.getNodeParameter('updateFields', i, {}) as IDataObject;

			if (updateFields.rules) {
				try {
					updateFields.rules = JSON.parse(updateFields.rules as string);
				} catch {
					throw new Error('Invalid JSON in rules field');
				}
			}

			responseData = await walkMeApiRequest.call(this, 'PUT', `/segments/v1/segments/${segmentId}`, updateFields);
			break;
		}

		case 'delete': {
			const segmentId = this.getNodeParameter('segmentId', i) as string;
			responseData = await walkMeApiRequest.call(this, 'DELETE', `/segments/v1/segments/${segmentId}`);
			break;
		}

		case 'getMembers': {
			const segmentId = this.getNodeParameter('segmentId', i) as string;
			const returnAll = this.getNodeParameter('returnAll', i) as boolean;

			if (returnAll) {
				responseData = await walkMeApiRequestAllItems.call(this, 'GET', `/segments/v1/segments/${segmentId}/members`);
			} else {
				const limit = this.getNodeParameter('limit', i) as number;
				responseData = await walkMeApiRequestAllItems.call(this, 'GET', `/segments/v1/segments/${segmentId}/members`, undefined, undefined, limit);
			}
			break;
		}

		case 'getAnalytics': {
			const segmentId = this.getNodeParameter('segmentId', i) as string;
			const dateRange = this.getNodeParameter('dateRange', i, {}) as IDataObject;

			const query: IDataObject = {};
			if (dateRange.range) {
				const range = dateRange.range as IDataObject;
				if (range.startDate) {
					query.startDate = formatDateForApi(range.startDate as string);
				}
				if (range.endDate) {
					query.endDate = formatDateForApi(range.endDate as string);
				}
			}

			responseData = await walkMeApiRequest.call(this, 'GET', `/segments/v1/segments/${segmentId}/analytics`, undefined, query);
			break;
		}

		case 'clone': {
			const segmentId = this.getNodeParameter('segmentId', i) as string;
			const newName = this.getNodeParameter('newName', i) as string;

			const body: IDataObject = {
				name: newName,
			};

			responseData = await walkMeApiRequest.call(this, 'POST', `/segments/v1/segments/${segmentId}/clone`, body);
			break;
		}

		default:
			throw new Error(`Unknown operation: ${operation}`);
	}

	const executionData = this.helpers.constructExecutionMetaData(
		this.helpers.returnJsonArray(responseData),
		{ itemData: { item: i } },
	);

	return executionData;
}
