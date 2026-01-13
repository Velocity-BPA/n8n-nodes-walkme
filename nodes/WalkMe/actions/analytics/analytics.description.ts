/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const analyticsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['analytics'],
			},
		},
		options: [
			{
				name: 'Export',
				value: 'export',
				description: 'Export analytics data',
				action: 'Export analytics',
			},
			{
				name: 'Get Completion Rates',
				value: 'getCompletionRates',
				description: 'Get completion rate metrics',
				action: 'Get completion rates',
			},
			{
				name: 'Get Content Performance',
				value: 'getContentPerformance',
				description: 'Get content performance metrics',
				action: 'Get content performance',
			},
			{
				name: 'Get Funnel Analysis',
				value: 'getFunnelAnalysis',
				description: 'Get funnel analysis data',
				action: 'Get funnel analysis',
			},
			{
				name: 'Get Goal Metrics',
				value: 'getGoalMetrics',
				description: 'Get goal completion data',
				action: 'Get goal metrics',
			},
			{
				name: 'Get Overview',
				value: 'getOverview',
				description: 'Get analytics overview',
				action: 'Get analytics overview',
			},
			{
				name: 'Get Time To Complete',
				value: 'getTimeToComplete',
				description: 'Get timing metrics',
				action: 'Get time to complete',
			},
			{
				name: 'Get User Engagement',
				value: 'getUserEngagement',
				description: 'Get user engagement data',
				action: 'Get user engagement',
			},
			{
				name: 'Get User Journeys',
				value: 'getUserJourneys',
				description: 'Get user journey analytics',
				action: 'Get user journeys',
			},
		],
		default: 'getOverview',
	},
];

export const analyticsFields: INodeProperties[] = [
	// ----------------------------------
	//         analytics: all operations
	// ----------------------------------
	{
		displayName: 'System ID',
		name: 'systemId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['analytics'],
			},
		},
		default: '',
		description: 'The WalkMe system ID',
	},
	{
		displayName: 'Date Range',
		name: 'dateRange',
		type: 'fixedCollection',
		required: true,
		displayOptions: {
			show: {
				resource: ['analytics'],
			},
		},
		default: {},
		options: [
			{
				displayName: 'Range',
				name: 'range',
				values: [
					{
						displayName: 'Start Date',
						name: 'startDate',
						type: 'dateTime',
						default: '',
						description: 'Start date for analytics',
					},
					{
						displayName: 'End Date',
						name: 'endDate',
						type: 'dateTime',
						default: '',
						description: 'End date for analytics',
					},
				],
			},
		],
	},

	// ----------------------------------
	//         analytics: getContentPerformance
	// ----------------------------------
	{
		displayName: 'Content ID',
		name: 'contentId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['analytics'],
				operation: ['getContentPerformance'],
			},
		},
		default: '',
		description: 'Filter by specific content ID (optional)',
	},

	// ----------------------------------
	//         analytics: getGoalMetrics
	// ----------------------------------
	{
		displayName: 'Goal ID',
		name: 'goalId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['analytics'],
				operation: ['getGoalMetrics'],
			},
		},
		default: '',
		description: 'Filter by specific goal ID (optional)',
	},

	// ----------------------------------
	//         analytics: getUserEngagement, getUserJourneys
	// ----------------------------------
	{
		displayName: 'Segment ID',
		name: 'segmentId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['analytics'],
				operation: ['getUserEngagement', 'getUserJourneys'],
			},
		},
		default: '',
		description: 'Filter by segment ID (optional)',
	},

	// ----------------------------------
	//         analytics: getFunnelAnalysis
	// ----------------------------------
	{
		displayName: 'Funnel ID',
		name: 'funnelId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['analytics'],
				operation: ['getFunnelAnalysis'],
			},
		},
		default: '',
		description: 'The funnel ID to analyze',
	},

	// ----------------------------------
	//         analytics: options
	// ----------------------------------
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		displayOptions: {
			show: {
				resource: ['analytics'],
				operation: ['getOverview', 'getContentPerformance', 'getUserEngagement', 'getCompletionRates', 'getTimeToComplete', 'getUserJourneys', 'getGoalMetrics'],
			},
		},
		default: {},
		options: [
			{
				displayName: 'Granularity',
				name: 'granularity',
				type: 'options',
				options: [
					{ name: 'Day', value: 'day' },
					{ name: 'Week', value: 'week' },
					{ name: 'Month', value: 'month' },
				],
				default: 'day',
				description: 'Time granularity for data',
			},
			{
				displayName: 'Include Breakdown',
				name: 'includeBreakdown',
				type: 'boolean',
				default: false,
				description: 'Whether to include detailed breakdown',
			},
		],
	},

	// ----------------------------------
	//         analytics: export
	// ----------------------------------
	{
		displayName: 'Export Format',
		name: 'exportFormat',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['analytics'],
				operation: ['export'],
			},
		},
		options: [
			{ name: 'CSV', value: 'csv' },
			{ name: 'JSON', value: 'json' },
			{ name: 'Excel', value: 'xlsx' },
		],
		default: 'csv',
		description: 'Export file format',
	},
	{
		displayName: 'Metrics',
		name: 'metrics',
		type: 'multiOptions',
		displayOptions: {
			show: {
				resource: ['analytics'],
				operation: ['export'],
			},
		},
		options: [
			{ name: 'Completion Rate', value: 'completionRate' },
			{ name: 'Content Plays', value: 'contentPlays' },
			{ name: 'Goal Completions', value: 'goalCompletions' },
			{ name: 'Page Views', value: 'pageViews' },
			{ name: 'Time To Complete', value: 'timeToComplete' },
			{ name: 'Unique Users', value: 'uniqueUsers' },
		],
		default: ['uniqueUsers', 'contentPlays'],
		description: 'Metrics to include in export',
	},
];
