/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const goalOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['goal'],
			},
		},
		options: [
			{
				name: 'Associate Content',
				value: 'associateContent',
				description: 'Link content to a goal',
				action: 'Associate content with goal',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new goal',
				action: 'Create a goal',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a goal',
				action: 'Delete a goal',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get goal details',
				action: 'Get a goal',
			},
			{
				name: 'Get Progress',
				value: 'getProgress',
				description: 'Get goal completion data',
				action: 'Get goal progress',
			},
			{
				name: 'Get Trends',
				value: 'getTrends',
				description: 'Get goal trends over time',
				action: 'Get goal trends',
			},
			{
				name: 'List',
				value: 'list',
				description: 'List all goals',
				action: 'List goals',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update goal definition',
				action: 'Update a goal',
			},
		],
		default: 'list',
	},
];

export const goalFields: INodeProperties[] = [
	// ----------------------------------
	//         goal: list
	// ----------------------------------
	{
		displayName: 'System ID',
		name: 'systemId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['goal'],
				operation: ['list', 'create'],
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
				resource: ['goal'],
				operation: ['list'],
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
				resource: ['goal'],
				operation: ['list'],
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

	// ----------------------------------
	//         goal: get, update, delete, getProgress, getTrends, associateContent
	// ----------------------------------
	{
		displayName: 'Goal ID',
		name: 'goalId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['goal'],
				operation: ['get', 'update', 'delete', 'getProgress', 'getTrends', 'associateContent'],
			},
		},
		default: '',
		description: 'The ID of the goal',
	},

	// ----------------------------------
	//         goal: create
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['goal'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The name of the goal',
	},
	{
		displayName: 'Definition',
		name: 'definition',
		type: 'json',
		required: true,
		displayOptions: {
			show: {
				resource: ['goal'],
				operation: ['create'],
			},
		},
		default: '{}',
		description: 'Goal completion criteria as JSON object',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		displayOptions: {
			show: {
				resource: ['goal'],
				operation: ['create'],
			},
		},
		default: {},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Description of the goal',
			},
			{
				displayName: 'Target Value',
				name: 'targetValue',
				type: 'number',
				default: 100,
				description: 'Target completion rate percentage',
			},
		],
	},

	// ----------------------------------
	//         goal: update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		displayOptions: {
			show: {
				resource: ['goal'],
				operation: ['update'],
			},
		},
		default: {},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'New name for the goal',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'New description for the goal',
			},
			{
				displayName: 'Definition',
				name: 'definition',
				type: 'json',
				default: '{}',
				description: 'Updated goal completion criteria as JSON object',
			},
			{
				displayName: 'Target Value',
				name: 'targetValue',
				type: 'number',
				default: 100,
				description: 'Updated target completion rate percentage',
			},
		],
	},

	// ----------------------------------
	//         goal: getProgress, getTrends
	// ----------------------------------
	{
		displayName: 'Date Range',
		name: 'dateRange',
		type: 'fixedCollection',
		displayOptions: {
			show: {
				resource: ['goal'],
				operation: ['getProgress', 'getTrends'],
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
						description: 'Start date for data',
					},
					{
						displayName: 'End Date',
						name: 'endDate',
						type: 'dateTime',
						default: '',
						description: 'End date for data',
					},
				],
			},
		],
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		displayOptions: {
			show: {
				resource: ['goal'],
				operation: ['getTrends'],
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
				description: 'Time granularity for trend data',
			},
		],
	},

	// ----------------------------------
	//         goal: associateContent
	// ----------------------------------
	{
		displayName: 'Content ID',
		name: 'contentId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['goal'],
				operation: ['associateContent'],
			},
		},
		default: '',
		description: 'The ID of the content to associate with the goal',
	},
];
