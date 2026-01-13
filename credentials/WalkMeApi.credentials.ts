/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class WalkMeApi implements ICredentialType {
	name = 'walkMeApi';
	displayName = 'WalkMe API';
	documentationUrl = 'https://developer.walkme.com/reference/introduction';

	properties: INodeProperties[] = [
		{
			displayName: 'Username',
			name: 'username',
			type: 'string',
			default: '',
			required: true,
			description: 'WalkMe API username (Client ID)',
		},
		{
			displayName: 'Password',
			name: 'password',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'WalkMe API password (Client Secret)',
		},
		{
			displayName: 'Region',
			name: 'region',
			type: 'options',
			options: [
				{
					name: 'US',
					value: 'US',
				},
				{
					name: 'EU',
					value: 'EU',
				},
				{
					name: 'FedRAMP',
					value: 'FedRAMP',
				},
				{
					name: 'Canada',
					value: 'Canada',
				},
			],
			default: 'US',
			required: true,
			description: 'WalkMe data center region',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.region === "EU" ? "https://eu-api.walkme.com" : $credentials.region === "FedRAMP" ? "https://api.walkmegov.com" : $credentials.region === "Canada" ? "https://api-ca1.walkmedap.com" : "https://api.walkme.com"}}',
			url: '/accounts/connect/token',
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			auth: {
				username: '={{$credentials.username}}',
				password: '={{$credentials.password}}',
			},
			body: 'grant_type=client_credentials',
		},
	};
}
