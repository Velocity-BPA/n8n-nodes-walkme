/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { walkMeApiRequest, buildQueryParams } from '../../transport/GenericFunctions';

export async function executeChecksumOperation(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<INodeExecutionData[]> {
	let responseData: IDataObject | IDataObject[];

	const systemId = this.getNodeParameter('systemId', i) as string;

	switch (operation) {
		case 'get': {
			const environment = this.getNodeParameter('environment', i) as string;
			const options = this.getNodeParameter('options', i, {}) as IDataObject;
			const query = buildQueryParams(options);

			responseData = await walkMeApiRequest.call(this, 'GET', `/content/v1/systems/${systemId}/checksum/${environment}`, undefined, query);
			break;
		}

		case 'verify': {
			const environment = this.getNodeParameter('environment', i) as string;
			const expectedChecksum = this.getNodeParameter('expectedChecksum', i) as string;

			const body: IDataObject = {
				expectedChecksum,
			};

			responseData = await walkMeApiRequest.call(this, 'POST', `/content/v1/systems/${systemId}/checksum/${environment}/verify`, body);
			break;
		}

		case 'compare': {
			const sourceEnvironment = this.getNodeParameter('sourceEnvironment', i) as string;
			const targetEnvironment = this.getNodeParameter('targetEnvironment', i) as string;

			const query: IDataObject = {
				source: sourceEnvironment,
				target: targetEnvironment,
			};

			responseData = await walkMeApiRequest.call(this, 'GET', `/content/v1/systems/${systemId}/checksum/compare`, undefined, query);
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
