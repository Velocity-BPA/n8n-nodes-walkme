/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { walkMeApiRequest, walkMeApiRequestAllItems } from '../../transport/GenericFunctions';

export async function executeMultiLanguageOperation(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<INodeExecutionData[]> {
	let responseData: IDataObject | IDataObject[];

	const systemId = this.getNodeParameter('systemId', i) as string;

	switch (operation) {
		case 'listLanguages': {
			const returnAll = this.getNodeParameter('returnAll', i) as boolean;

			if (returnAll) {
				responseData = await walkMeApiRequestAllItems.call(this, 'GET', `/translations/v1/systems/${systemId}/languages`);
			} else {
				const limit = this.getNodeParameter('limit', i) as number;
				responseData = await walkMeApiRequestAllItems.call(this, 'GET', `/translations/v1/systems/${systemId}/languages`, undefined, undefined, limit);
			}
			break;
		}

		case 'getLanguage': {
			const languageCode = this.getNodeParameter('languageCode', i) as string;
			responseData = await walkMeApiRequest.call(this, 'GET', `/translations/v1/systems/${systemId}/languages/${languageCode}`);
			break;
		}

		case 'addLanguage': {
			const language = this.getNodeParameter('language', i) as string;
			const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

			const body: IDataObject = {
				languageCode: language,
				...additionalFields,
			};

			responseData = await walkMeApiRequest.call(this, 'POST', `/translations/v1/systems/${systemId}/languages`, body);
			break;
		}

		case 'removeLanguage': {
			const languageCode = this.getNodeParameter('languageCode', i) as string;
			responseData = await walkMeApiRequest.call(this, 'DELETE', `/translations/v1/systems/${systemId}/languages/${languageCode}`);
			break;
		}

		case 'exportTranslations': {
			const languageCode = this.getNodeParameter('languageCode', i) as string;
			const format = this.getNodeParameter('format', i) as string;
			const contentFilter = this.getNodeParameter('contentFilter', i, []) as string[];

			const query: IDataObject = {
				format,
			};

			if (contentFilter.length > 0) {
				query.contentTypes = contentFilter.join(',');
			}

			responseData = await walkMeApiRequest.call(this, 'GET', `/translations/v1/systems/${systemId}/languages/${languageCode}/export`, undefined, query);
			break;
		}

		case 'importTranslations': {
			const languageCode = this.getNodeParameter('languageCode', i) as string;
			const translationDataJson = this.getNodeParameter('translationData', i) as string;
			const importOptions = this.getNodeParameter('importOptions', i, {}) as IDataObject;

			let translationData: IDataObject;
			try {
				translationData = JSON.parse(translationDataJson) as IDataObject;
			} catch {
				throw new Error('Invalid JSON in translationData field');
			}

			const body: IDataObject = {
				translations: translationData,
				...importOptions,
			};

			responseData = await walkMeApiRequest.call(this, 'POST', `/translations/v1/systems/${systemId}/languages/${languageCode}/import`, body);
			break;
		}

		case 'getTranslationStatus': {
			const languageCode = this.getNodeParameter('languageCode', i) as string;
			responseData = await walkMeApiRequest.call(this, 'GET', `/translations/v1/systems/${systemId}/languages/${languageCode}/status`);
			break;
		}

		case 'updateTranslations': {
			const languageCode = this.getNodeParameter('languageCode', i) as string;
			const translationsData = this.getNodeParameter('translations', i, {}) as IDataObject;

			const translations: IDataObject = {};
			if (translationsData.translation) {
				const transArray = translationsData.translation as Array<{ key: string; value: string }>;
				for (const trans of transArray) {
					translations[trans.key] = trans.value;
				}
			}

			const body: IDataObject = {
				translations,
			};

			responseData = await walkMeApiRequest.call(this, 'PUT', `/translations/v1/systems/${systemId}/languages/${languageCode}/translations`, body);
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
