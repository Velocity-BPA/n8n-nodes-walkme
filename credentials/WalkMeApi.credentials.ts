import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class WalkMeApi implements ICredentialType {
	name = 'walkMeApi';
	displayName = 'WalkMe API';
	documentationUrl = 'https://docs.walkme.com/article/api-documentation';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'Your WalkMe API key from the Admin Console',
		},
		{
			displayName: 'API Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://api.walkme.com/v2',
			required: true,
			description: 'The base URL for WalkMe API',
		},
		{
			displayName: 'Organization ID',
			name: 'organizationId',
			type: 'string',
			default: '',
			description: 'Your WalkMe organization ID (if required for specific operations)',
		},
	];
}