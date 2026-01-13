/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { walkMeApiRequest, walkMeApiRequestAllItems, buildQueryParams } from '../../transport/GenericFunctions';

export async function executeUserOperation(
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
				responseData = await walkMeApiRequestAllItems.call(this, 'GET', '/users/v1/users', undefined, query);
			} else {
				const limit = this.getNodeParameter('limit', i) as number;
				responseData = await walkMeApiRequestAllItems.call(this, 'GET', '/users/v1/users', undefined, query, limit);
			}
			break;
		}

		case 'get': {
			const userId = this.getNodeParameter('userId', i) as string;
			responseData = await walkMeApiRequest.call(this, 'GET', `/users/v1/users/${userId}`);
			break;
		}

		case 'create': {
			const email = this.getNodeParameter('email', i) as string;
			const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

			const body: IDataObject = {
				email,
				...additionalFields,
			};

			responseData = await walkMeApiRequest.call(this, 'POST', '/users/v1/users', body);
			break;
		}

		case 'update': {
			const userId = this.getNodeParameter('userId', i) as string;
			const updateFields = this.getNodeParameter('updateFields', i, {}) as IDataObject;

			responseData = await walkMeApiRequest.call(this, 'PUT', `/users/v1/users/${userId}`, updateFields);
			break;
		}

		case 'delete': {
			const userId = this.getNodeParameter('userId', i) as string;
			responseData = await walkMeApiRequest.call(this, 'DELETE', `/users/v1/users/${userId}`);
			break;
		}

		case 'assignRole': {
			const userId = this.getNodeParameter('userId', i) as string;
			const role = this.getNodeParameter('role', i) as string;

			const body: IDataObject = { role };
			responseData = await walkMeApiRequest.call(this, 'POST', `/users/v1/users/${userId}/roles`, body);
			break;
		}

		case 'removeRole': {
			const userId = this.getNodeParameter('userId', i) as string;
			const role = this.getNodeParameter('role', i) as string;

			responseData = await walkMeApiRequest.call(this, 'DELETE', `/users/v1/users/${userId}/roles/${role}`);
			break;
		}

		case 'listRoles': {
			const returnAll = this.getNodeParameter('returnAll', i) as boolean;

			if (returnAll) {
				responseData = await walkMeApiRequestAllItems.call(this, 'GET', '/users/v1/roles');
			} else {
				const limit = this.getNodeParameter('limit', i) as number;
				responseData = await walkMeApiRequestAllItems.call(this, 'GET', '/users/v1/roles', undefined, undefined, limit);
			}
			break;
		}

		case 'getPermissions': {
			const userId = this.getNodeParameter('userId', i) as string;
			responseData = await walkMeApiRequest.call(this, 'GET', `/users/v1/users/${userId}/permissions`);
			break;
		}

		case 'activate': {
			const userId = this.getNodeParameter('userId', i) as string;
			responseData = await walkMeApiRequest.call(this, 'POST', `/users/v1/users/${userId}/activate`);
			break;
		}

		case 'deactivate': {
			const userId = this.getNodeParameter('userId', i) as string;
			responseData = await walkMeApiRequest.call(this, 'POST', `/users/v1/users/${userId}/deactivate`);
			break;
		}

		case 'resetPassword': {
			const userId = this.getNodeParameter('userId', i) as string;
			responseData = await walkMeApiRequest.call(this, 'POST', `/users/v1/users/${userId}/reset-password`);
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
