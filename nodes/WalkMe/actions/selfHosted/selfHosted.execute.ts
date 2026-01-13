/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { walkMeApiRequest, walkMeApiRequestAllItems, buildQueryParams } from '../../transport/GenericFunctions';

export async function executeSelfHostedOperation(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<INodeExecutionData[]> {
	let responseData: IDataObject | IDataObject[];

	const systemId = this.getNodeParameter('systemId', i) as string;

	switch (operation) {
		case 'listVersions': {
			const returnAll = this.getNodeParameter('returnAll', i) as boolean;

			if (returnAll) {
				responseData = await walkMeApiRequestAllItems.call(this, 'GET', `/selfhosted/v1/systems/${systemId}/versions`);
			} else {
				const limit = this.getNodeParameter('limit', i) as number;
				responseData = await walkMeApiRequestAllItems.call(this, 'GET', `/selfhosted/v1/systems/${systemId}/versions`, undefined, undefined, limit);
			}
			break;
		}

		case 'getLatestVersion': {
			responseData = await walkMeApiRequest.call(this, 'GET', `/selfhosted/v1/systems/${systemId}/versions/latest`);
			break;
		}

		case 'downloadFiles': {
			const options = this.getNodeParameter('options', i, {}) as IDataObject;
			const query = buildQueryParams(options);

			responseData = await walkMeApiRequest.call(this, 'GET', `/selfhosted/v1/systems/${systemId}/download`, undefined, query);
			break;
		}

		case 'downloadVersion': {
			const version = this.getNodeParameter('version', i) as string;
			const options = this.getNodeParameter('options', i, {}) as IDataObject;
			const query = buildQueryParams(options);

			responseData = await walkMeApiRequest.call(this, 'GET', `/selfhosted/v1/systems/${systemId}/versions/${version}/download`, undefined, query);
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
