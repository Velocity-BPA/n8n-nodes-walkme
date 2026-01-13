/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const checksumOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['checksum'],
			},
		},
		options: [
			{
				name: 'Compare',
				value: 'compare',
				description: 'Compare checksums across environments',
				action: 'Compare checksums',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get published content checksum',
				action: 'Get checksum',
			},
			{
				name: 'Verify',
				value: 'verify',
				description: 'Verify content integrity',
				action: 'Verify checksum',
			},
		],
		default: 'get',
	},
];

export const checksumFields: INodeProperties[] = [
	// ----------------------------------
	//         checksum: all operations
	// ----------------------------------
	{
		displayName: 'System ID',
		name: 'systemId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['checksum'],
			},
		},
		default: '',
		description: 'The WalkMe system ID',
	},

	// ----------------------------------
	//         checksum: get, verify
	// ----------------------------------
	{
		displayName: 'Environment',
		name: 'environment',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['checksum'],
				operation: ['get', 'verify'],
			},
		},
		options: [
			{ name: 'Production', value: 'production' },
			{ name: 'Test', value: 'test' },
		],
		default: 'production',
		description: 'Environment to check',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		displayOptions: {
			show: {
				resource: ['checksum'],
				operation: ['get'],
			},
		},
		default: {},
		options: [
			{
				displayName: 'Content Type',
				name: 'contentType',
				type: 'options',
				options: [
					{ name: 'All', value: 'all' },
					{ name: 'Launchers', value: 'Launcher' },
					{ name: 'Resources', value: 'Resource' },
					{ name: 'ShoutOuts', value: 'ShoutOut' },
					{ name: 'Smart Tips', value: 'SmartTip' },
					{ name: 'Smart Walk-Thrus', value: 'SmartWalkThru' },
					{ name: 'Surveys', value: 'Survey' },
				],
				default: 'all',
				description: 'Filter by content type',
			},
		],
	},

	// ----------------------------------
	//         checksum: verify
	// ----------------------------------
	{
		displayName: 'Expected Checksum',
		name: 'expectedChecksum',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['checksum'],
				operation: ['verify'],
			},
		},
		default: '',
		description: 'The expected checksum value to verify against',
	},

	// ----------------------------------
	//         checksum: compare
	// ----------------------------------
	{
		displayName: 'Source Environment',
		name: 'sourceEnvironment',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['checksum'],
				operation: ['compare'],
			},
		},
		options: [
			{ name: 'Production', value: 'production' },
			{ name: 'Test', value: 'test' },
		],
		default: 'production',
		description: 'Source environment for comparison',
	},
	{
		displayName: 'Target Environment',
		name: 'targetEnvironment',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['checksum'],
				operation: ['compare'],
			},
		},
		options: [
			{ name: 'Production', value: 'production' },
			{ name: 'Test', value: 'test' },
		],
		default: 'test',
		description: 'Target environment for comparison',
	},
];
