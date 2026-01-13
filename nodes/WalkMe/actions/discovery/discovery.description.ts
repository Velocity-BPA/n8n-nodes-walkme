/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const discoveryOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['discovery'],
			},
		},
		options: [
			{
				name: 'Add Tag',
				value: 'addTag',
				description: 'Tag an application',
				action: 'Add tag to app',
			},
			{
				name: 'Categorize App',
				value: 'categorizeApp',
				description: 'Assign category to app',
				action: 'Categorize app',
			},
			{
				name: 'Export Report',
				value: 'exportReport',
				description: 'Export apps data',
				action: 'Export apps report',
			},
			{
				name: 'Get App Details',
				value: 'getAppDetails',
				description: 'Get app usage details',
				action: 'Get app details',
			},
			{
				name: 'Get App Trends',
				value: 'getAppTrends',
				description: 'Get app usage trends',
				action: 'Get app trends',
			},
			{
				name: 'Get App Users',
				value: 'getAppUsers',
				description: 'Get users of an app',
				action: 'Get app users',
			},
			{
				name: 'Get Stats',
				value: 'getStats',
				description: 'Get discovered apps statistics',
				action: 'Get discovery stats',
			},
			{
				name: 'List Apps',
				value: 'listApps',
				description: 'List all discovered applications',
				action: 'List discovered apps',
			},
			{
				name: 'Remove Tag',
				value: 'removeTag',
				description: 'Remove tag from app',
				action: 'Remove tag from app',
			},
		],
		default: 'listApps',
	},
];

export const discoveryFields: INodeProperties[] = [
	// ----------------------------------
	//         discovery: all operations
	// ----------------------------------
	{
		displayName: 'Date',
		name: 'date',
		type: 'dateTime',
		required: true,
		displayOptions: {
			show: {
				resource: ['discovery'],
				operation: ['getStats', 'listApps', 'exportReport'],
			},
		},
		default: '',
		description: 'Report date',
	},

	// ----------------------------------
	//         discovery: listApps
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['discovery'],
				operation: ['listApps', 'getAppUsers'],
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
				resource: ['discovery'],
				operation: ['listApps', 'getAppUsers'],
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
				resource: ['discovery'],
				operation: ['listApps'],
			},
		},
		default: {},
		options: [
			{
				displayName: 'Category',
				name: 'category',
				type: 'string',
				default: '',
				description: 'Filter by category',
			},
			{
				displayName: 'Tags',
				name: 'tags',
				type: 'string',
				default: '',
				description: 'Filter by tags (comma-separated)',
			},
			{
				displayName: 'Sort By',
				name: 'sortBy',
				type: 'options',
				options: [
					{ name: 'Name', value: 'name' },
					{ name: 'Users', value: 'users' },
					{ name: 'Sessions', value: 'sessions' },
					{ name: 'Time Spent', value: 'timeSpent' },
				],
				default: 'users',
				description: 'Sort field',
			},
			{
				displayName: 'Sort Order',
				name: 'sortOrder',
				type: 'options',
				options: [
					{ name: 'Ascending', value: 'asc' },
					{ name: 'Descending', value: 'desc' },
				],
				default: 'desc',
				description: 'Sort order',
			},
		],
	},

	// ----------------------------------
	//         discovery: getAppDetails, categorizeApp, addTag, removeTag, getAppUsers, getAppTrends
	// ----------------------------------
	{
		displayName: 'App ID',
		name: 'appId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['discovery'],
				operation: ['getAppDetails', 'categorizeApp', 'addTag', 'removeTag', 'getAppUsers', 'getAppTrends'],
			},
		},
		default: '',
		description: 'The application ID',
	},

	// ----------------------------------
	//         discovery: categorizeApp
	// ----------------------------------
	{
		displayName: 'Category',
		name: 'category',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['discovery'],
				operation: ['categorizeApp'],
			},
		},
		default: '',
		description: 'The category to assign to the app',
	},

	// ----------------------------------
	//         discovery: addTag, removeTag
	// ----------------------------------
	{
		displayName: 'Tag',
		name: 'tag',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['discovery'],
				operation: ['addTag', 'removeTag'],
			},
		},
		default: '',
		description: 'The tag to add or remove',
	},

	// ----------------------------------
	//         discovery: getAppTrends
	// ----------------------------------
	{
		displayName: 'Date Range',
		name: 'dateRange',
		type: 'fixedCollection',
		displayOptions: {
			show: {
				resource: ['discovery'],
				operation: ['getAppTrends'],
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
						description: 'Start date for trends',
					},
					{
						displayName: 'End Date',
						name: 'endDate',
						type: 'dateTime',
						default: '',
						description: 'End date for trends',
					},
				],
			},
		],
	},

	// ----------------------------------
	//         discovery: exportReport
	// ----------------------------------
	{
		displayName: 'Export Format',
		name: 'exportFormat',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['discovery'],
				operation: ['exportReport'],
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
];
