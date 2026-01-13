/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { walkMeApiRequest, walkMeApiRequestAllItems, formatDateForApi, buildQueryParams } from '../../transport/GenericFunctions';

export async function executeDiscoveryOperation(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<INodeExecutionData[]> {
	let responseData: IDataObject | IDataObject[];

	switch (operation) {
		case 'getStats': {
			const date = this.getNodeParameter('date', i) as string;
			const formattedDate = formatDateForApi(date);

			responseData = await walkMeApiRequest.call(this, 'GET', '/discovery/v1/stats', undefined, { date: formattedDate });
			break;
		}

		case 'listApps': {
			const date = this.getNodeParameter('date', i) as string;
			const returnAll = this.getNodeParameter('returnAll', i) as boolean;
			const filters = this.getNodeParameter('filters', i, {}) as IDataObject;

			const query: IDataObject = {
				date: formatDateForApi(date),
				...buildQueryParams(filters),
			};

			if (filters.tags) {
				query.tags = (filters.tags as string).split(',').map(t => t.trim());
			}

			if (returnAll) {
				responseData = await walkMeApiRequestAllItems.call(this, 'GET', '/discovery/v1/apps', undefined, query);
			} else {
				const limit = this.getNodeParameter('limit', i) as number;
				responseData = await walkMeApiRequestAllItems.call(this, 'GET', '/discovery/v1/apps', undefined, query, limit);
			}
			break;
		}

		case 'getAppDetails': {
			const appId = this.getNodeParameter('appId', i) as string;
			responseData = await walkMeApiRequest.call(this, 'GET', `/discovery/v1/apps/${appId}`);
			break;
		}

		case 'categorizeApp': {
			const appId = this.getNodeParameter('appId', i) as string;
			const category = this.getNodeParameter('category', i) as string;

			const body: IDataObject = { category };
			responseData = await walkMeApiRequest.call(this, 'PUT', `/discovery/v1/apps/${appId}/category`, body);
			break;
		}

		case 'addTag': {
			const appId = this.getNodeParameter('appId', i) as string;
			const tag = this.getNodeParameter('tag', i) as string;

			const body: IDataObject = { tag };
			responseData = await walkMeApiRequest.call(this, 'POST', `/discovery/v1/apps/${appId}/tags`, body);
			break;
		}

		case 'removeTag': {
			const appId = this.getNodeParameter('appId', i) as string;
			const tag = this.getNodeParameter('tag', i) as string;

			responseData = await walkMeApiRequest.call(this, 'DELETE', `/discovery/v1/apps/${appId}/tags/${encodeURIComponent(tag)}`);
			break;
		}

		case 'getAppUsers': {
			const appId = this.getNodeParameter('appId', i) as string;
			const returnAll = this.getNodeParameter('returnAll', i) as boolean;

			if (returnAll) {
				responseData = await walkMeApiRequestAllItems.call(this, 'GET', `/discovery/v1/apps/${appId}/users`);
			} else {
				const limit = this.getNodeParameter('limit', i) as number;
				responseData = await walkMeApiRequestAllItems.call(this, 'GET', `/discovery/v1/apps/${appId}/users`, undefined, undefined, limit);
			}
			break;
		}

		case 'getAppTrends': {
			const appId = this.getNodeParameter('appId', i) as string;
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

			responseData = await walkMeApiRequest.call(this, 'GET', `/discovery/v1/apps/${appId}/trends`, undefined, query);
			break;
		}

		case 'exportReport': {
			const date = this.getNodeParameter('date', i) as string;
			const exportFormat = this.getNodeParameter('exportFormat', i) as string;

			const query: IDataObject = {
				date: formatDateForApi(date),
				format: exportFormat,
			};

			responseData = await walkMeApiRequest.call(this, 'GET', '/discovery/v1/export', undefined, query);
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
