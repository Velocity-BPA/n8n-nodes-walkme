/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const endUserOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['endUser'],
			},
		},
		options: [
			{
				name: 'Bulk Update',
				value: 'bulkUpdate',
				description: 'Batch update multiple end users',
				action: 'Bulk update end users',
			},
			{
				name: 'Create Attribute Definition',
				value: 'createAttributeDefinition',
				description: 'Define a new end user attribute',
				action: 'Create attribute definition',
			},
			{
				name: 'Delete Attribute Definition',
				value: 'deleteAttributeDefinition',
				description: 'Remove an attribute definition',
				action: 'Delete attribute definition',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieve end user data',
				action: 'Get end user',
			},
			{
				name: 'Get Attributes',
				value: 'getAttributes',
				description: 'Get end user attribute definitions',
				action: 'Get end user attributes',
			},
			{
				name: 'Get Segments',
				value: 'getSegments',
				description: 'Get segments for an end user',
				action: 'Get end user segments',
			},
			{
				name: 'List Integrations',
				value: 'listIntegrations',
				description: 'List incoming integrations',
				action: 'List end user integrations',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update end user attributes',
				action: 'Update end user',
			},
		],
		default: 'update',
	},
];

export const endUserFields: INodeProperties[] = [
	// ----------------------------------
	//         endUser: update
	// ----------------------------------
	{
		displayName: 'Integration Endpoint',
		name: 'integrationEndpoint',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['endUser'],
				operation: ['update', 'bulkUpdate'],
			},
		},
		default: '',
		placeholder: 'https://api.walkme.com/enduser/v1/update',
		description: 'The integration-specific endpoint URL',
	},
	{
		displayName: 'Integration Token',
		name: 'integrationToken',
		type: 'string',
		typeOptions: {
			password: true,
		},
		required: true,
		displayOptions: {
			show: {
				resource: ['endUser'],
				operation: ['update', 'bulkUpdate'],
			},
		},
		default: '',
		description: 'The integration-specific token',
	},

	// ----------------------------------
	//         endUser: update (single)
	// ----------------------------------
	{
		displayName: 'User Identifier',
		name: 'userIdentifier',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['endUser'],
				operation: ['update', 'get', 'getSegments'],
			},
		},
		default: '',
		description: 'The end user identifier (email or custom ID)',
	},
	{
		displayName: 'Identifier Type',
		name: 'identifierType',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['endUser'],
				operation: ['update', 'get', 'getSegments'],
			},
		},
		options: [
			{ name: 'Email', value: 'email' },
			{ name: 'Custom ID', value: 'customId' },
			{ name: 'WalkMe ID', value: 'walkmeId' },
		],
		default: 'email',
		description: 'The type of identifier',
	},
	{
		displayName: 'Attributes',
		name: 'attributes',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				resource: ['endUser'],
				operation: ['update'],
			},
		},
		default: {},
		options: [
			{
				displayName: 'Attribute',
				name: 'attribute',
				values: [
					{
						displayName: 'Name',
						name: 'name',
						type: 'string',
						default: '',
						description: 'The attribute name',
					},
					{
						displayName: 'Value',
						name: 'value',
						type: 'string',
						default: '',
						description: 'The attribute value',
					},
				],
			},
		],
		description: 'Custom attributes to set on the end user',
	},

	// ----------------------------------
	//         endUser: bulkUpdate
	// ----------------------------------
	{
		displayName: 'Users',
		name: 'users',
		type: 'json',
		required: true,
		displayOptions: {
			show: {
				resource: ['endUser'],
				operation: ['bulkUpdate'],
			},
		},
		default: '[]',
		description: 'Array of user objects with identifier and attributes',
	},

	// ----------------------------------
	//         endUser: getAttributes, listIntegrations
	// ----------------------------------
	{
		displayName: 'System ID',
		name: 'systemId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['endUser'],
				operation: ['getAttributes', 'listIntegrations', 'createAttributeDefinition', 'deleteAttributeDefinition'],
			},
		},
		default: '',
		description: 'The WalkMe system ID',
	},

	// ----------------------------------
	//         endUser: createAttributeDefinition
	// ----------------------------------
	{
		displayName: 'Attribute Name',
		name: 'attributeName',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['endUser'],
				operation: ['createAttributeDefinition', 'deleteAttributeDefinition'],
			},
		},
		default: '',
		description: 'The name of the attribute',
	},
	{
		displayName: 'Attribute Type',
		name: 'attributeType',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['endUser'],
				operation: ['createAttributeDefinition'],
			},
		},
		options: [
			{ name: 'String', value: 'string' },
			{ name: 'Number', value: 'number' },
			{ name: 'Boolean', value: 'boolean' },
			{ name: 'Date', value: 'date' },
		],
		default: 'string',
		description: 'The data type of the attribute',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		displayOptions: {
			show: {
				resource: ['endUser'],
				operation: ['createAttributeDefinition'],
			},
		},
		default: {},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Description of the attribute',
			},
			{
				displayName: 'Default Value',
				name: 'defaultValue',
				type: 'string',
				default: '',
				description: 'Default value for the attribute',
			},
		],
	},
];
