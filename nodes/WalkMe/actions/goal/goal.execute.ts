/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { walkMeApiRequest, walkMeApiRequestAllItems, formatDateForApi } from '../../transport/GenericFunctions';

export async function executeGoalOperation(
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
				responseData = await walkMeApiRequestAllItems.call(this, 'GET', `/goals/v1/systems/${systemId}/goals`);
			} else {
				const limit = this.getNodeParameter('limit', i) as number;
				responseData = await walkMeApiRequestAllItems.call(this, 'GET', `/goals/v1/systems/${systemId}/goals`, undefined, undefined, limit);
			}
			break;
		}

		case 'get': {
			const goalId = this.getNodeParameter('goalId', i) as string;
			responseData = await walkMeApiRequest.call(this, 'GET', `/goals/v1/goals/${goalId}`);
			break;
		}

		case 'create': {
			const systemId = this.getNodeParameter('systemId', i) as string;
			const name = this.getNodeParameter('name', i) as string;
			const definitionJson = this.getNodeParameter('definition', i) as string;
			const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

			let definition: IDataObject;
			try {
				definition = JSON.parse(definitionJson) as IDataObject;
			} catch {
				throw new Error('Invalid JSON in definition field');
			}

			const body: IDataObject = {
				name,
				definition,
				systemId,
				...additionalFields,
			};

			responseData = await walkMeApiRequest.call(this, 'POST', '/goals/v1/goals', body);
			break;
		}

		case 'update': {
			const goalId = this.getNodeParameter('goalId', i) as string;
			const updateFields = this.getNodeParameter('updateFields', i, {}) as IDataObject;

			if (updateFields.definition) {
				try {
					updateFields.definition = JSON.parse(updateFields.definition as string);
				} catch {
					throw new Error('Invalid JSON in definition field');
				}
			}

			responseData = await walkMeApiRequest.call(this, 'PUT', `/goals/v1/goals/${goalId}`, updateFields);
			break;
		}

		case 'delete': {
			const goalId = this.getNodeParameter('goalId', i) as string;
			responseData = await walkMeApiRequest.call(this, 'DELETE', `/goals/v1/goals/${goalId}`);
			break;
		}

		case 'getProgress': {
			const goalId = this.getNodeParameter('goalId', i) as string;
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

			responseData = await walkMeApiRequest.call(this, 'GET', `/goals/v1/goals/${goalId}/progress`, undefined, query);
			break;
		}

		case 'getTrends': {
			const goalId = this.getNodeParameter('goalId', i) as string;
			const dateRange = this.getNodeParameter('dateRange', i, {}) as IDataObject;
			const options = this.getNodeParameter('options', i, {}) as IDataObject;

			const query: IDataObject = { ...options };
			if (dateRange.range) {
				const range = dateRange.range as IDataObject;
				if (range.startDate) {
					query.startDate = formatDateForApi(range.startDate as string);
				}
				if (range.endDate) {
					query.endDate = formatDateForApi(range.endDate as string);
				}
			}

			responseData = await walkMeApiRequest.call(this, 'GET', `/goals/v1/goals/${goalId}/trends`, undefined, query);
			break;
		}

		case 'associateContent': {
			const goalId = this.getNodeParameter('goalId', i) as string;
			const contentId = this.getNodeParameter('contentId', i) as string;

			const body: IDataObject = {
				contentId,
			};

			responseData = await walkMeApiRequest.call(this, 'POST', `/goals/v1/goals/${goalId}/content`, body);
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
