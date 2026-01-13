/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const contentOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['content'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get content details by ID',
				action: 'Get content',
			},
			{
				name: 'Get Analytics',
				value: 'getAnalytics',
				description: 'Get content performance analytics',
				action: 'Get content analytics',
			},
			{
				name: 'Get Versions',
				value: 'getVersions',
				description: 'Get content version history',
				action: 'Get content versions',
			},
			{
				name: 'List',
				value: 'list',
				description: 'List all content items',
				action: 'List content',
			},
			{
				name: 'List Launchers',
				value: 'listLaunchers',
				description: 'List all Launchers',
				action: 'List launchers',
			},
			{
				name: 'List Resources',
				value: 'listResources',
				description: 'List all Resources',
				action: 'List resources',
			},
			{
				name: 'List ShoutOuts',
				value: 'listShoutOuts',
				description: 'List all ShoutOuts',
				action: 'List shoutouts',
			},
			{
				name: 'List Smart Walk-Thrus',
				value: 'listSmartWalkThrus',
				description: 'List all Smart Walk-Thrus',
				action: 'List smart walk thrus',
			},
			{
				name: 'List Surveys',
				value: 'listSurveys',
				description: 'List all Surveys',
				action: 'List surveys',
			},
			{
				name: 'Publish',
				value: 'publish',
				description: 'Publish content to an environment',
				action: 'Publish content',
			},
			{
				name: 'Rollback',
				value: 'rollback',
				description: 'Rollback content to a previous version',
				action: 'Rollback content',
			},
			{
				name: 'Unpublish',
				value: 'unpublish',
				description: 'Unpublish content from an environment',
				action: 'Unpublish content',
			},
		],
		default: 'list',
	},
];

export const contentFields: INodeProperties[] = [
	// ----------------------------------
	//         content: list operations
	// ----------------------------------
	{
		displayName: 'System ID',
		name: 'systemId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['content'],
				operation: ['list', 'listSmartWalkThrus', 'listResources', 'listShoutOuts', 'listLaunchers', 'listSurveys'],
			},
		},
		default: '',
		description: 'The WalkMe system ID',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['content'],
				operation: ['list', 'listSmartWalkThrus', 'listResources', 'listShoutOuts', 'listLaunchers', 'listSurveys', 'getVersions'],
			},
		},
		default: false,
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['content'],
				operation: ['list', 'listSmartWalkThrus', 'listResources', 'listShoutOuts', 'listLaunchers', 'listSurveys', 'getVersions'],
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		default: 50,
		description: 'Max number of results to return',
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		displayOptions: {
			show: {
				resource: ['content'],
				operation: ['list'],
			},
		},
		default: {},
		options: [
			{
				displayName: 'Content Type',
				name: 'contentType',
				type: 'options',
				options: [
					{ name: 'Smart Walk-Thru', value: 'SmartWalkThru' },
					{ name: 'Resource', value: 'Resource' },
					{ name: 'Survey', value: 'Survey' },
					{ name: 'Launcher', value: 'Launcher' },
					{ name: 'ShoutOut', value: 'ShoutOut' },
					{ name: 'Smart Tip', value: 'SmartTip' },
				],
				default: 'SmartWalkThru',
				description: 'Filter by content type',
			},
			{
				displayName: 'Environment',
				name: 'environment',
				type: 'options',
				options: [
					{ name: 'Production', value: 'production' },
					{ name: 'Test', value: 'test' },
				],
				default: 'production',
				description: 'Filter by environment',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{ name: 'Published', value: 'published' },
					{ name: 'Draft', value: 'draft' },
					{ name: 'Archived', value: 'archived' },
				],
				default: 'published',
				description: 'Filter by status',
			},
		],
	},

	// ----------------------------------
	//         content: get, publish, unpublish, getAnalytics, getVersions, rollback
	// ----------------------------------
	{
		displayName: 'Content ID',
		name: 'contentId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['content'],
				operation: ['get', 'publish', 'unpublish', 'getAnalytics', 'getVersions', 'rollback'],
			},
		},
		default: '',
		description: 'The ID of the content item',
	},

	// ----------------------------------
	//         content: publish, unpublish
	// ----------------------------------
	{
		displayName: 'Environment',
		name: 'environment',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['content'],
				operation: ['publish', 'unpublish'],
			},
		},
		options: [
			{ name: 'Production', value: 'production' },
			{ name: 'Test', value: 'test' },
		],
		default: 'production',
		description: 'The target environment',
	},

	// ----------------------------------
	//         content: getAnalytics
	// ----------------------------------
	{
		displayName: 'Date Range',
		name: 'dateRange',
		type: 'fixedCollection',
		displayOptions: {
			show: {
				resource: ['content'],
				operation: ['getAnalytics'],
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
	//         content: rollback
	// ----------------------------------
	{
		displayName: 'Version ID',
		name: 'versionId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['content'],
				operation: ['rollback'],
			},
		},
		default: '',
		description: 'The version ID to rollback to',
	},
];
