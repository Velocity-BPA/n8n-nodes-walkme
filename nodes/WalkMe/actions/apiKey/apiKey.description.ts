/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const apiKeyOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['apiKey'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Generate a new API key',
				action: 'Create an API key',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Revoke an API key',
				action: 'Delete an API key',
			},
			{
				name: 'List',
				value: 'list',
				description: 'List all API keys for account',
				action: 'List API keys',
			},
			{
				name: 'Rotate',
				value: 'rotate',
				description: 'Rotate an API key',
				action: 'Rotate an API key',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update API key settings',
				action: 'Update an API key',
			},
		],
		default: 'list',
	},
];

export const apiKeyFields: INodeProperties[] = [
	// ----------------------------------
	//         apiKey: list
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['apiKey'],
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
				resource: ['apiKey'],
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
	//         apiKey: get, update, delete, rotate
	// ----------------------------------
	{
		displayName: 'Key ID',
		name: 'keyId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['apiKey'],
				operation: ['update', 'delete', 'rotate'],
			},
		},
		default: '',
		description: 'The ID of the API key',
	},

	// ----------------------------------
	//         apiKey: create
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['apiKey'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Display name for the API key',
	},
	{
		displayName: 'Scopes',
		name: 'scopes',
		type: 'multiOptions',
		required: true,
		displayOptions: {
			show: {
				resource: ['apiKey'],
				operation: ['create'],
			},
		},
		options: [
			{ name: 'Analytics Read', value: 'analytics:read' },
			{ name: 'Content Read', value: 'content:read' },
			{ name: 'Content Write', value: 'content:write' },
			{ name: 'End User Update Write', value: 'endUserUpdate:write' },
			{ name: 'Systems Read', value: 'systems:read' },
			{ name: 'Systems Write', value: 'systems:write' },
			{ name: 'Users Read', value: 'users:read' },
			{ name: 'Users Write', value: 'users:write' },
		],
		default: [],
		description: 'Permission scopes for the API key',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		displayOptions: {
			show: {
				resource: ['apiKey'],
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
				description: 'Description of the API key',
			},
			{
				displayName: 'Expires At',
				name: 'expiresAt',
				type: 'dateTime',
				default: '',
				description: 'Expiration date for the API key',
			},
		],
	},

	// ----------------------------------
	//         apiKey: update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		displayOptions: {
			show: {
				resource: ['apiKey'],
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
				description: 'New display name for the API key',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'New description for the API key',
			},
			{
				displayName: 'Scopes',
				name: 'scopes',
				type: 'multiOptions',
				options: [
					{ name: 'Analytics Read', value: 'analytics:read' },
					{ name: 'Content Read', value: 'content:read' },
					{ name: 'Content Write', value: 'content:write' },
					{ name: 'End User Update Write', value: 'endUserUpdate:write' },
					{ name: 'Systems Read', value: 'systems:read' },
					{ name: 'Systems Write', value: 'systems:write' },
					{ name: 'Users Read', value: 'users:read' },
					{ name: 'Users Write', value: 'users:write' },
				],
				default: [],
				description: 'Updated permission scopes',
			},
			{
				displayName: 'Expires At',
				name: 'expiresAt',
				type: 'dateTime',
				default: '',
				description: 'New expiration date',
			},
		],
	},
];
