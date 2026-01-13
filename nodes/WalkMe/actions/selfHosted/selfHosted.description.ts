/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const selfHostedOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['selfHosted'],
			},
		},
		options: [
			{
				name: 'Download Files',
				value: 'downloadFiles',
				description: 'Download self-hosted WalkMe files',
				action: 'Download self hosted files',
			},
			{
				name: 'Download Version',
				value: 'downloadVersion',
				description: 'Download a specific version',
				action: 'Download specific version',
			},
			{
				name: 'Get Latest Version',
				value: 'getLatestVersion',
				description: 'Get latest version information',
				action: 'Get latest version',
			},
			{
				name: 'List Available Versions',
				value: 'listVersions',
				description: 'List all available versions',
				action: 'List available versions',
			},
		],
		default: 'getLatestVersion',
	},
];

export const selfHostedFields: INodeProperties[] = [
	// ----------------------------------
	//         selfHosted: all operations
	// ----------------------------------
	{
		displayName: 'System ID',
		name: 'systemId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['selfHosted'],
			},
		},
		default: '',
		description: 'The WalkMe system ID',
	},

	// ----------------------------------
	//         selfHosted: downloadFiles, downloadVersion
	// ----------------------------------
	{
		displayName: 'Version',
		name: 'version',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['selfHosted'],
				operation: ['downloadVersion'],
			},
		},
		default: '',
		description: 'Specific version to download',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		displayOptions: {
			show: {
				resource: ['selfHosted'],
				operation: ['downloadFiles', 'downloadVersion'],
			},
		},
		default: {},
		options: [
			{
				displayName: 'Format',
				name: 'format',
				type: 'options',
				options: [
					{ name: 'ZIP', value: 'zip' },
					{ name: 'TAR.GZ', value: 'tar.gz' },
				],
				default: 'zip',
				description: 'Download format',
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
				description: 'Environment to download files for',
			},
		],
	},

	// ----------------------------------
	//         selfHosted: listVersions
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['selfHosted'],
				operation: ['listVersions'],
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
				resource: ['selfHosted'],
				operation: ['listVersions'],
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		default: 20,
		description: 'Max number of results to return',
	},
];
