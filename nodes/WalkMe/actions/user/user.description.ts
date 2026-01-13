/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const userOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['user'],
			},
		},
		options: [
			{
				name: 'Activate',
				value: 'activate',
				description: 'Activate a user account',
				action: 'Activate a user',
			},
			{
				name: 'Assign Role',
				value: 'assignRole',
				description: 'Assign a role to a user',
				action: 'Assign role to user',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new WalkMe user',
				action: 'Create a user',
			},
			{
				name: 'Deactivate',
				value: 'deactivate',
				description: 'Deactivate a user account',
				action: 'Deactivate a user',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a WalkMe user',
				action: 'Delete a user',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a WalkMe user by ID',
				action: 'Get a user',
			},
			{
				name: 'Get Permissions',
				value: 'getPermissions',
				description: 'Get user\'s effective permissions',
				action: 'Get user permissions',
			},
			{
				name: 'List',
				value: 'list',
				description: 'List all WalkMe users',
				action: 'List users',
			},
			{
				name: 'List Roles',
				value: 'listRoles',
				description: 'List available roles',
				action: 'List roles',
			},
			{
				name: 'Remove Role',
				value: 'removeRole',
				description: 'Remove a role from a user',
				action: 'Remove role from user',
			},
			{
				name: 'Reset Password',
				value: 'resetPassword',
				description: 'Trigger password reset for user',
				action: 'Reset user password',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a WalkMe user',
				action: 'Update a user',
			},
		],
		default: 'list',
	},
];

export const userFields: INodeProperties[] = [
	// ----------------------------------
	//         user: list
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['list', 'listRoles'],
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
				resource: ['user'],
				operation: ['list', 'listRoles'],
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
				resource: ['user'],
				operation: ['list'],
			},
		},
		default: {},
		options: [
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				placeholder: 'name@email.com',
				default: '',
				description: 'Filter by email address',
			},
			{
				displayName: 'Role',
				name: 'role',
				type: 'string',
				default: '',
				description: 'Filter by role name',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{ name: 'Active', value: 'active' },
					{ name: 'Inactive', value: 'inactive' },
					{ name: 'Pending', value: 'pending' },
				],
				default: 'active',
				description: 'Filter by user status',
			},
		],
	},

	// ----------------------------------
	//         user: get, update, delete, activate, deactivate, getPermissions, resetPassword
	// ----------------------------------
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['get', 'update', 'delete', 'assignRole', 'removeRole', 'activate', 'deactivate', 'getPermissions', 'resetPassword'],
			},
		},
		default: '',
		description: 'The ID of the user',
	},

	// ----------------------------------
	//         user: create
	// ----------------------------------
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		placeholder: 'name@email.com',
		required: true,
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The email address of the user',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['create'],
			},
		},
		default: {},
		options: [
			{
				displayName: 'First Name',
				name: 'firstName',
				type: 'string',
				default: '',
				description: 'The first name of the user',
			},
			{
				displayName: 'Last Name',
				name: 'lastName',
				type: 'string',
				default: '',
				description: 'The last name of the user',
			},
			{
				displayName: 'Role',
				name: 'role',
				type: 'string',
				default: '',
				description: 'The role to assign to the user',
			},
			{
				displayName: 'Send Invite',
				name: 'sendInvite',
				type: 'boolean',
				default: true,
				description: 'Whether to send an invitation email to the user',
			},
		],
	},

	// ----------------------------------
	//         user: update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['update'],
			},
		},
		default: {},
		options: [
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				placeholder: 'name@email.com',
				default: '',
				description: 'The new email address of the user',
			},
			{
				displayName: 'First Name',
				name: 'firstName',
				type: 'string',
				default: '',
				description: 'The new first name of the user',
			},
			{
				displayName: 'Last Name',
				name: 'lastName',
				type: 'string',
				default: '',
				description: 'The new last name of the user',
			},
		],
	},

	// ----------------------------------
	//         user: assignRole, removeRole
	// ----------------------------------
	{
		displayName: 'Role',
		name: 'role',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['assignRole', 'removeRole'],
			},
		},
		default: '',
		description: 'The role to assign or remove',
	},
];
