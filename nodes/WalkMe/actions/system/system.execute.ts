/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { walkMeApiRequest, walkMeApiRequestAllItems, buildQueryParams } from '../../transport/GenericFunctions';

export async function executeSystemOperation(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<INodeExecutionData[]> {
	let responseData: IDataObject | IDataObject[];

	switch (operation) {
		case 'list': {
			const returnAll = this.getNodeParameter('returnAll', i) as boolean;
			const filters = this.getNodeParameter('filters', i, {}) as IDataObject;
			const query = buildQueryParams(filters);

			if (returnAll) {
				responseData = await walkMeApiRequestAllItems.call(this, 'GET', '/systems/v1/systems', undefined, query);
			} else {
				const limit = this.getNodeParameter('limit', i) as number;
				responseData = await walkMeApiRequestAllItems.call(this, 'GET', '/systems/v1/systems', undefined, query, limit);
			}
			break;
		}

		case 'get': {
			const systemId = this.getNodeParameter('systemId', i) as string;
			responseData = await walkMeApiRequest.call(this, 'GET', `/systems/v1/systems/${systemId}`);
			break;
		}

		case 'create': {
			const name = this.getNodeParameter('name', i) as string;
			const type = this.getNodeParameter('type', i) as string;
			const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

			const body: IDataObject = {
				name,
				type,
				...additionalFields,
			};

			responseData = await walkMeApiRequest.call(this, 'POST', '/systems/v1/systems', body);
			break;
		}

		case 'update': {
			const systemId = this.getNodeParameter('systemId', i) as string;
			const updateFields = this.getNodeParameter('updateFields', i, {}) as IDataObject;

			responseData = await walkMeApiRequest.call(this, 'PUT', `/systems/v1/systems/${systemId}`, updateFields);
			break;
		}

		case 'delete': {
			const systemId = this.getNodeParameter('systemId', i) as string;
			responseData = await walkMeApiRequest.call(this, 'DELETE', `/systems/v1/systems/${systemId}`);
			break;
		}

		case 'getSettings': {
			const systemId = this.getNodeParameter('systemId', i) as string;
			responseData = await walkMeApiRequest.call(this, 'GET', `/systems/v1/systems/${systemId}/settings`);
			break;
		}

		case 'updateSettings': {
			const systemId = this.getNodeParameter('systemId', i) as string;
			const settings = this.getNodeParameter('settings', i) as string;

			let settingsObj: IDataObject;
			try {
				settingsObj = JSON.parse(settings) as IDataObject;
			} catch {
				throw new Error('Invalid JSON in settings field');
			}

			responseData = await walkMeApiRequest.call(this, 'PUT', `/systems/v1/systems/${systemId}/settings`, settingsObj);
			break;
		}

		case 'getInstallationScript': {
			const systemId = this.getNodeParameter('systemId', i) as string;
			responseData = await walkMeApiRequest.call(this, 'GET', `/systems/v1/systems/${systemId}/installation-script`);
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
