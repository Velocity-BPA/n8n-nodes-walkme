/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { walkMeApiRequest, walkMeApiRequestAllItems, buildQueryParams, formatDateForApi } from '../../transport/GenericFunctions';

export async function executeContentOperation(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<INodeExecutionData[]> {
	let responseData: IDataObject | IDataObject[];

	switch (operation) {
		case 'list': {
			const systemId = this.getNodeParameter('systemId', i) as string;
			const returnAll = this.getNodeParameter('returnAll', i) as boolean;
			const filters = this.getNodeParameter('filters', i, {}) as IDataObject;
			const query = buildQueryParams(filters);

			if (returnAll) {
				responseData = await walkMeApiRequestAllItems.call(this, 'GET', `/content/v1/systems/${systemId}/items`, undefined, query);
			} else {
				const limit = this.getNodeParameter('limit', i) as number;
				responseData = await walkMeApiRequestAllItems.call(this, 'GET', `/content/v1/systems/${systemId}/items`, undefined, query, limit);
			}
			break;
		}

		case 'listSmartWalkThrus': {
			const systemId = this.getNodeParameter('systemId', i) as string;
			const returnAll = this.getNodeParameter('returnAll', i) as boolean;

			if (returnAll) {
				responseData = await walkMeApiRequestAllItems.call(this, 'GET', `/content/v1/systems/${systemId}/smartwalkthrus`);
			} else {
				const limit = this.getNodeParameter('limit', i) as number;
				responseData = await walkMeApiRequestAllItems.call(this, 'GET', `/content/v1/systems/${systemId}/smartwalkthrus`, undefined, undefined, limit);
			}
			break;
		}

		case 'listResources': {
			const systemId = this.getNodeParameter('systemId', i) as string;
			const returnAll = this.getNodeParameter('returnAll', i) as boolean;

			if (returnAll) {
				responseData = await walkMeApiRequestAllItems.call(this, 'GET', `/content/v1/systems/${systemId}/resources`);
			} else {
				const limit = this.getNodeParameter('limit', i) as number;
				responseData = await walkMeApiRequestAllItems.call(this, 'GET', `/content/v1/systems/${systemId}/resources`, undefined, undefined, limit);
			}
			break;
		}

		case 'listShoutOuts': {
			const systemId = this.getNodeParameter('systemId', i) as string;
			const returnAll = this.getNodeParameter('returnAll', i) as boolean;

			if (returnAll) {
				responseData = await walkMeApiRequestAllItems.call(this, 'GET', `/content/v1/systems/${systemId}/shoutouts`);
			} else {
				const limit = this.getNodeParameter('limit', i) as number;
				responseData = await walkMeApiRequestAllItems.call(this, 'GET', `/content/v1/systems/${systemId}/shoutouts`, undefined, undefined, limit);
			}
			break;
		}

		case 'listLaunchers': {
			const systemId = this.getNodeParameter('systemId', i) as string;
			const returnAll = this.getNodeParameter('returnAll', i) as boolean;

			if (returnAll) {
				responseData = await walkMeApiRequestAllItems.call(this, 'GET', `/content/v1/systems/${systemId}/launchers`);
			} else {
				const limit = this.getNodeParameter('limit', i) as number;
				responseData = await walkMeApiRequestAllItems.call(this, 'GET', `/content/v1/systems/${systemId}/launchers`, undefined, undefined, limit);
			}
			break;
		}

		case 'listSurveys': {
			const systemId = this.getNodeParameter('systemId', i) as string;
			const returnAll = this.getNodeParameter('returnAll', i) as boolean;

			if (returnAll) {
				responseData = await walkMeApiRequestAllItems.call(this, 'GET', `/content/v1/systems/${systemId}/surveys`);
			} else {
				const limit = this.getNodeParameter('limit', i) as number;
				responseData = await walkMeApiRequestAllItems.call(this, 'GET', `/content/v1/systems/${systemId}/surveys`, undefined, undefined, limit);
			}
			break;
		}

		case 'get': {
			const contentId = this.getNodeParameter('contentId', i) as string;
			responseData = await walkMeApiRequest.call(this, 'GET', `/content/v1/items/${contentId}`);
			break;
		}

		case 'publish': {
			const contentId = this.getNodeParameter('contentId', i) as string;
			const environment = this.getNodeParameter('environment', i) as string;

			const body: IDataObject = { environment };
			responseData = await walkMeApiRequest.call(this, 'POST', `/content/v1/items/${contentId}/publish`, body);
			break;
		}

		case 'unpublish': {
			const contentId = this.getNodeParameter('contentId', i) as string;
			const environment = this.getNodeParameter('environment', i) as string;

			const body: IDataObject = { environment };
			responseData = await walkMeApiRequest.call(this, 'POST', `/content/v1/items/${contentId}/unpublish`, body);
			break;
		}

		case 'getAnalytics': {
			const contentId = this.getNodeParameter('contentId', i) as string;
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

			responseData = await walkMeApiRequest.call(this, 'GET', `/content/v1/items/${contentId}/analytics`, undefined, query);
			break;
		}

		case 'getVersions': {
			const contentId = this.getNodeParameter('contentId', i) as string;
			const returnAll = this.getNodeParameter('returnAll', i) as boolean;

			if (returnAll) {
				responseData = await walkMeApiRequestAllItems.call(this, 'GET', `/content/v1/items/${contentId}/versions`);
			} else {
				const limit = this.getNodeParameter('limit', i) as number;
				responseData = await walkMeApiRequestAllItems.call(this, 'GET', `/content/v1/items/${contentId}/versions`, undefined, undefined, limit);
			}
			break;
		}

		case 'rollback': {
			const contentId = this.getNodeParameter('contentId', i) as string;
			const versionId = this.getNodeParameter('versionId', i) as string;

			const body: IDataObject = { versionId };
			responseData = await walkMeApiRequest.call(this, 'POST', `/content/v1/items/${contentId}/rollback`, body);
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
