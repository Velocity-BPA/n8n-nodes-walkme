/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { walkMeApiRequest, walkMeApiRequestAllItems } from '../../transport/GenericFunctions';

export async function executeApiKeyOperation(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<INodeExecutionData[]> {
	let responseData: IDataObject | IDataObject[];

	switch (operation) {
		case 'list': {
			const returnAll = this.getNodeParameter('returnAll', i) as boolean;

			if (returnAll) {
				responseData = await walkMeApiRequestAllItems.call(this, 'GET', '/accounts/v1/api-keys');
			} else {
				const limit = this.getNodeParameter('limit', i) as number;
				responseData = await walkMeApiRequestAllItems.call(this, 'GET', '/accounts/v1/api-keys', undefined, undefined, limit);
			}
			break;
		}

		case 'create': {
			const name = this.getNodeParameter('name', i) as string;
			const scopes = this.getNodeParameter('scopes', i) as string[];
			const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

			const body: IDataObject = {
				name,
				scopes,
				...additionalFields,
			};

			responseData = await walkMeApiRequest.call(this, 'POST', '/accounts/v1/api-keys', body);
			break;
		}

		case 'update': {
			const keyId = this.getNodeParameter('keyId', i) as string;
			const updateFields = this.getNodeParameter('updateFields', i, {}) as IDataObject;

			responseData = await walkMeApiRequest.call(this, 'PUT', `/accounts/v1/api-keys/${keyId}`, updateFields);
			break;
		}

		case 'delete': {
			const keyId = this.getNodeParameter('keyId', i) as string;
			responseData = await walkMeApiRequest.call(this, 'DELETE', `/accounts/v1/api-keys/${keyId}`);
			break;
		}

		case 'rotate': {
			const keyId = this.getNodeParameter('keyId', i) as string;
			responseData = await walkMeApiRequest.call(this, 'POST', `/accounts/v1/api-keys/${keyId}/rotate`);
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
