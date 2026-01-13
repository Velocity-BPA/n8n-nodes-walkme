/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { walkMeApiRequest, formatDateForApi, buildQueryParams } from '../../transport/GenericFunctions';

export async function executeAnalyticsOperation(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<INodeExecutionData[]> {
	let responseData: IDataObject | IDataObject[];

	const systemId = this.getNodeParameter('systemId', i) as string;
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

	switch (operation) {
		case 'getOverview': {
			const options = this.getNodeParameter('options', i, {}) as IDataObject;
			const fullQuery = { ...query, ...buildQueryParams(options) };

			responseData = await walkMeApiRequest.call(this, 'GET', `/analytics/v1/systems/${systemId}/overview`, undefined, fullQuery);
			break;
		}

		case 'getContentPerformance': {
			const contentId = this.getNodeParameter('contentId', i, '') as string;
			const options = this.getNodeParameter('options', i, {}) as IDataObject;
			const fullQuery = { ...query, ...buildQueryParams(options) };

			if (contentId) {
				fullQuery.contentId = contentId;
			}

			responseData = await walkMeApiRequest.call(this, 'GET', `/analytics/v1/systems/${systemId}/content/performance`, undefined, fullQuery);
			break;
		}

		case 'getUserEngagement': {
			const segmentId = this.getNodeParameter('segmentId', i, '') as string;
			const options = this.getNodeParameter('options', i, {}) as IDataObject;
			const fullQuery = { ...query, ...buildQueryParams(options) };

			if (segmentId) {
				fullQuery.segmentId = segmentId;
			}

			responseData = await walkMeApiRequest.call(this, 'GET', `/analytics/v1/systems/${systemId}/users/engagement`, undefined, fullQuery);
			break;
		}

		case 'getCompletionRates': {
			const options = this.getNodeParameter('options', i, {}) as IDataObject;
			const fullQuery = { ...query, ...buildQueryParams(options) };

			responseData = await walkMeApiRequest.call(this, 'GET', `/analytics/v1/systems/${systemId}/completion-rates`, undefined, fullQuery);
			break;
		}

		case 'getFunnelAnalysis': {
			const funnelId = this.getNodeParameter('funnelId', i) as string;

			responseData = await walkMeApiRequest.call(this, 'GET', `/analytics/v1/systems/${systemId}/funnels/${funnelId}`, undefined, query);
			break;
		}

		case 'getTimeToComplete': {
			const options = this.getNodeParameter('options', i, {}) as IDataObject;
			const fullQuery = { ...query, ...buildQueryParams(options) };

			responseData = await walkMeApiRequest.call(this, 'GET', `/analytics/v1/systems/${systemId}/time-to-complete`, undefined, fullQuery);
			break;
		}

		case 'getUserJourneys': {
			const segmentId = this.getNodeParameter('segmentId', i, '') as string;
			const options = this.getNodeParameter('options', i, {}) as IDataObject;
			const fullQuery = { ...query, ...buildQueryParams(options) };

			if (segmentId) {
				fullQuery.segmentId = segmentId;
			}

			responseData = await walkMeApiRequest.call(this, 'GET', `/analytics/v1/systems/${systemId}/user-journeys`, undefined, fullQuery);
			break;
		}

		case 'getGoalMetrics': {
			const goalId = this.getNodeParameter('goalId', i, '') as string;
			const options = this.getNodeParameter('options', i, {}) as IDataObject;
			const fullQuery = { ...query, ...buildQueryParams(options) };

			if (goalId) {
				fullQuery.goalId = goalId;
			}

			responseData = await walkMeApiRequest.call(this, 'GET', `/analytics/v1/systems/${systemId}/goals`, undefined, fullQuery);
			break;
		}

		case 'export': {
			const exportFormat = this.getNodeParameter('exportFormat', i) as string;
			const metrics = this.getNodeParameter('metrics', i) as string[];

			const fullQuery = {
				...query,
				format: exportFormat,
				metrics: metrics.join(','),
			};

			responseData = await walkMeApiRequest.call(this, 'GET', `/analytics/v1/systems/${systemId}/export`, undefined, fullQuery);
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
