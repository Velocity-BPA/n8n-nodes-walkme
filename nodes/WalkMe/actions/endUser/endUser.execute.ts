/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { walkMeApiRequest, walkMeEndUserRequest, walkMeApiRequestAllItems } from '../../transport/GenericFunctions';

export async function executeEndUserOperation(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<INodeExecutionData[]> {
	let responseData: IDataObject | IDataObject[];

	switch (operation) {
		case 'update': {
			const integrationEndpoint = this.getNodeParameter('integrationEndpoint', i) as string;
			const integrationToken = this.getNodeParameter('integrationToken', i) as string;
			const userIdentifier = this.getNodeParameter('userIdentifier', i) as string;
			const identifierType = this.getNodeParameter('identifierType', i) as string;
			const attributesData = this.getNodeParameter('attributes', i, {}) as IDataObject;

			const attributes: IDataObject = {};
			if (attributesData.attribute) {
				const attrArray = attributesData.attribute as Array<{ name: string; value: string }>;
				for (const attr of attrArray) {
					attributes[attr.name] = attr.value;
				}
			}

			const userData: IDataObject = {
				[identifierType]: userIdentifier,
				...attributes,
			};

			responseData = await walkMeEndUserRequest.call(this, integrationEndpoint, integrationToken, [userData]);
			break;
		}

		case 'bulkUpdate': {
			const integrationEndpoint = this.getNodeParameter('integrationEndpoint', i) as string;
			const integrationToken = this.getNodeParameter('integrationToken', i) as string;
			const usersJson = this.getNodeParameter('users', i) as string;

			let users: IDataObject[];
			try {
				users = JSON.parse(usersJson) as IDataObject[];
			} catch {
				throw new Error('Invalid JSON in users field');
			}

			responseData = await walkMeEndUserRequest.call(this, integrationEndpoint, integrationToken, users);
			break;
		}

		case 'getAttributes': {
			const systemId = this.getNodeParameter('systemId', i) as string;
			responseData = await walkMeApiRequest.call(this, 'GET', `/enduser/v1/systems/${systemId}/attributes`);
			break;
		}

		case 'get': {
			const userIdentifier = this.getNodeParameter('userIdentifier', i) as string;
			const identifierType = this.getNodeParameter('identifierType', i) as string;

			const query: IDataObject = {
				identifierType,
				identifier: userIdentifier,
			};

			responseData = await walkMeApiRequest.call(this, 'GET', '/enduser/v1/users', undefined, query);
			break;
		}

		case 'getSegments': {
			const userIdentifier = this.getNodeParameter('userIdentifier', i) as string;
			const identifierType = this.getNodeParameter('identifierType', i) as string;

			const query: IDataObject = {
				identifierType,
				identifier: userIdentifier,
			};

			responseData = await walkMeApiRequest.call(this, 'GET', '/enduser/v1/users/segments', undefined, query);
			break;
		}

		case 'listIntegrations': {
			const systemId = this.getNodeParameter('systemId', i) as string;
			responseData = await walkMeApiRequestAllItems.call(this, 'GET', `/enduser/v1/systems/${systemId}/integrations`);
			break;
		}

		case 'createAttributeDefinition': {
			const systemId = this.getNodeParameter('systemId', i) as string;
			const attributeName = this.getNodeParameter('attributeName', i) as string;
			const attributeType = this.getNodeParameter('attributeType', i) as string;
			const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

			const body: IDataObject = {
				name: attributeName,
				type: attributeType,
				...additionalFields,
			};

			responseData = await walkMeApiRequest.call(this, 'POST', `/enduser/v1/systems/${systemId}/attributes`, body);
			break;
		}

		case 'deleteAttributeDefinition': {
			const systemId = this.getNodeParameter('systemId', i) as string;
			const attributeName = this.getNodeParameter('attributeName', i) as string;

			responseData = await walkMeApiRequest.call(this, 'DELETE', `/enduser/v1/systems/${systemId}/attributes/${attributeName}`);
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
