/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const segmentOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['segment'],
			},
		},
		options: [
			{
				name: 'Clone',
				value: 'clone',
				description: 'Duplicate an existing segment',
				action: 'Clone a segment',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new segment',
				action: 'Create a segment',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a segment',
				action: 'Delete a segment',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get segment details',
				action: 'Get a segment',
			},
			{
				name: 'Get Analytics',
				value: 'getAnalytics',
				description: 'Get segment performance metrics',
				action: 'Get segment analytics',
			},
			{
				name: 'Get Members',
				value: 'getMembers',
				description: 'Get users in a segment',
				action: 'Get segment members',
			},
			{
				name: 'List',
				value: 'list',
				description: 'List all segments',
				action: 'List segments',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update segment rules',
				action: 'Update a segment',
			},
		],
		default: 'list',
	},
];

export const segmentFields: INodeProperties[] = [
	// ----------------------------------
	//         segment: list
	// ----------------------------------
	{
		displayName: 'System ID',
		name: 'systemId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['segment'],
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
				resource: ['segment'],
				operation: ['list', 'getMembers'],
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
				resource: ['segment'],
				operation: ['list', 'getMembers'],
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
	//         segment: get, update, delete, clone, getMembers, getAnalytics
	// ----------------------------------
	{
		displayName: 'Segment ID',
		name: 'segmentId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['segment'],
				operation: ['get', 'update', 'delete', 'clone', 'getMembers', 'getAnalytics'],
			},
		},
		default: '',
		description: 'The ID of the segment',
	},

	// ----------------------------------
	//         segment: create
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['segment'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The name of the segment',
	},
	{
		displayName: 'Rules',
		name: 'rules',
		type: 'json',
		required: true,
		displayOptions: {
			show: {
				resource: ['segment'],
				operation: ['create'],
			},
		},
		default: '[]',
		description: 'Segment rule definitions as JSON array',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		displayOptions: {
			show: {
				resource: ['segment'],
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
				description: 'Description of the segment',
			},
		],
	},

	// ----------------------------------
	//         segment: update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		displayOptions: {
			show: {
				resource: ['segment'],
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
				description: 'New name for the segment',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'New description for the segment',
			},
			{
				displayName: 'Rules',
				name: 'rules',
				type: 'json',
				default: '[]',
				description: 'Updated segment rule definitions as JSON array',
			},
		],
	},

	// ----------------------------------
	//         segment: clone
	// ----------------------------------
	{
		displayName: 'New Name',
		name: 'newName',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['segment'],
				operation: ['clone'],
			},
		},
		default: '',
		description: 'Name for the cloned segment',
	},

	// ----------------------------------
	//         segment: getAnalytics
	// ----------------------------------
	{
		displayName: 'Date Range',
		name: 'dateRange',
		type: 'fixedCollection',
		displayOptions: {
			show: {
				resource: ['segment'],
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
];
