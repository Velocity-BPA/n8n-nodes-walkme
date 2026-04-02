import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class WalkMeApi implements ICredentialType {
	name = 'walkMeApi';
	displayName = 'WalkMe API';
	documentationUrl = 'https://developers.walkme.com';
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
			description: 'API key from WalkMe admin console under Settings > API Keys',
		},
		{
			displayName: 'API Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://api.walkme.com/v2',
			description: 'Base URL for WalkMe API',
		},
	];
}