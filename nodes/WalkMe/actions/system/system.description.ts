/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const systemOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['system'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new WalkMe system',
				action: 'Create a system',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a WalkMe system',
				action: 'Delete a system',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get system details',
				action: 'Get a system',
			},
			{
				name: 'Get Installation Script',
				value: 'getInstallationScript',
				description: 'Get the tracking snippet for a system',
				action: 'Get installation script',
			},
			{
				name: 'Get Settings',
				value: 'getSettings',
				description: 'Get system configuration settings',
				action: 'Get system settings',
			},
			{
				name: 'List',
				value: 'list',
				description: 'List all WalkMe systems',
				action: 'List systems',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update system properties',
				action: 'Update a system',
			},
			{
				name: 'Update Settings',
				value: 'updateSettings',
				description: 'Update system configuration settings',
				action: 'Update system settings',
			},
		],
		default: 'list',
	},
];

export const systemFields: INodeProperties[] = [
	// ----------------------------------
	//         system: list
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['system'],
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
				resource: ['system'],
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
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		displayOptions: {
			show: {
				resource: ['system'],
				operation: ['list'],
			},
		},
		default: {},
		options: [
			{
				displayName: 'Type',
				name: 'type',
				type: 'options',
				options: [
					{ name: 'Web', value: 'web' },
					{ name: 'Mobile', value: 'mobile' },
					{ name: 'Desktop', value: 'desktop' },
				],
				default: 'web',
				description: 'Filter by system type',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{ name: 'Active', value: 'active' },
					{ name: 'Inactive', value: 'inactive' },
				],
				default: 'active',
				description: 'Filter by system status',
			},
		],
	},

	// ----------------------------------
	//         system: get
	// ----------------------------------
	{
		displayName: 'System ID',
		name: 'systemId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['system'],
				operation: ['get', 'delete', 'update', 'getSettings', 'updateSettings', 'getInstallationScript'],
			},
		},
		default: '',
		description: 'The ID of the system',
	},

	// ----------------------------------
	//         system: create
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['system'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The name of the system',
	},
	{
		displayName: 'Type',
		name: 'type',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['system'],
				operation: ['create'],
			},
		},
		options: [
			{ name: 'Web', value: 'web' },
			{ name: 'Mobile', value: 'mobile' },
			{ name: 'Desktop', value: 'desktop' },
		],
		default: 'web',
		description: 'The type of system',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		displayOptions: {
			show: {
				resource: ['system'],
				operation: ['create'],
			},
		},
		default: {},
		options: [
			{
				displayName: 'URL Pattern',
				name: 'url',
				type: 'string',
				default: '',
				description: 'URL pattern for the system',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Description of the system',
			},
		],
	},

	// ----------------------------------
	//         system: update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		displayOptions: {
			show: {
				resource: ['system'],
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
				description: 'New name for the system',
			},
			{
				displayName: 'URL Pattern',
				name: 'url',
				type: 'string',
				default: '',
				description: 'New URL pattern for the system',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'New description for the system',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{ name: 'Active', value: 'active' },
					{ name: 'Inactive', value: 'inactive' },
				],
				default: 'active',
				description: 'System status',
			},
		],
	},

	// ----------------------------------
	//         system: updateSettings
	// ----------------------------------
	{
		displayName: 'Settings',
		name: 'settings',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['system'],
				operation: ['updateSettings'],
			},
		},
		default: '{}',
		description: 'System settings as JSON object',
	},
];
