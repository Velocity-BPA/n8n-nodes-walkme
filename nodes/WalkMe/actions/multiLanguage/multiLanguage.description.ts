/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const multiLanguageOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['multiLanguage'],
			},
		},
		options: [
			{
				name: 'Add Language',
				value: 'addLanguage',
				description: 'Add a new language to the system',
				action: 'Add language',
			},
			{
				name: 'Export Translations',
				value: 'exportTranslations',
				description: 'Export translation files',
				action: 'Export translations',
			},
			{
				name: 'Get Language',
				value: 'getLanguage',
				description: 'Get language details',
				action: 'Get language',
			},
			{
				name: 'Get Translation Status',
				value: 'getTranslationStatus',
				description: 'Get translation completion status',
				action: 'Get translation status',
			},
			{
				name: 'Import Translations',
				value: 'importTranslations',
				description: 'Import translation files',
				action: 'Import translations',
			},
			{
				name: 'List Languages',
				value: 'listLanguages',
				description: 'List all configured languages',
				action: 'List languages',
			},
			{
				name: 'Remove Language',
				value: 'removeLanguage',
				description: 'Remove a language from the system',
				action: 'Remove language',
			},
			{
				name: 'Update Translations',
				value: 'updateTranslations',
				description: 'Update specific translations',
				action: 'Update translations',
			},
		],
		default: 'listLanguages',
	},
];

export const multiLanguageFields: INodeProperties[] = [
	// ----------------------------------
	//         multiLanguage: all operations
	// ----------------------------------
	{
		displayName: 'System ID',
		name: 'systemId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['multiLanguage'],
			},
		},
		default: '',
		description: 'The WalkMe system ID',
	},

	// ----------------------------------
	//         multiLanguage: listLanguages
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['multiLanguage'],
				operation: ['listLanguages'],
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
				resource: ['multiLanguage'],
				operation: ['listLanguages'],
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
	//         multiLanguage: getLanguage, removeLanguage, exportTranslations, getTranslationStatus
	// ----------------------------------
	{
		displayName: 'Language Code',
		name: 'languageCode',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['multiLanguage'],
				operation: ['getLanguage', 'removeLanguage', 'exportTranslations', 'getTranslationStatus', 'importTranslations', 'updateTranslations'],
			},
		},
		default: '',
		placeholder: 'en-US',
		description: 'ISO language code (e.g., en-US, de-DE, fr-FR)',
	},

	// ----------------------------------
	//         multiLanguage: addLanguage
	// ----------------------------------
	{
		displayName: 'Language',
		name: 'language',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['multiLanguage'],
				operation: ['addLanguage'],
			},
		},
		options: [
			{ name: 'Chinese (Simplified)', value: 'zh-CN' },
			{ name: 'Chinese (Traditional)', value: 'zh-TW' },
			{ name: 'Dutch', value: 'nl-NL' },
			{ name: 'English (UK)', value: 'en-GB' },
			{ name: 'English (US)', value: 'en-US' },
			{ name: 'French', value: 'fr-FR' },
			{ name: 'German', value: 'de-DE' },
			{ name: 'Italian', value: 'it-IT' },
			{ name: 'Japanese', value: 'ja-JP' },
			{ name: 'Korean', value: 'ko-KR' },
			{ name: 'Portuguese (Brazil)', value: 'pt-BR' },
			{ name: 'Spanish', value: 'es-ES' },
		],
		default: 'en-US',
		description: 'The language to add',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		displayOptions: {
			show: {
				resource: ['multiLanguage'],
				operation: ['addLanguage'],
			},
		},
		default: {},
		options: [
			{
				displayName: 'Is Default',
				name: 'isDefault',
				type: 'boolean',
				default: false,
				description: 'Whether this should be the default language',
			},
			{
				displayName: 'Auto-Translate',
				name: 'autoTranslate',
				type: 'boolean',
				default: false,
				description: 'Whether to enable auto-translation',
			},
		],
	},

	// ----------------------------------
	//         multiLanguage: exportTranslations
	// ----------------------------------
	{
		displayName: 'Format',
		name: 'format',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['multiLanguage'],
				operation: ['exportTranslations'],
			},
		},
		options: [
			{ name: 'CSV', value: 'csv' },
			{ name: 'JSON', value: 'json' },
			{ name: 'XLIFF', value: 'xliff' },
		],
		default: 'json',
		description: 'Export file format',
	},
	{
		displayName: 'Content Filter',
		name: 'contentFilter',
		type: 'multiOptions',
		displayOptions: {
			show: {
				resource: ['multiLanguage'],
				operation: ['exportTranslations'],
			},
		},
		options: [
			{ name: 'Launchers', value: 'Launcher' },
			{ name: 'Resources', value: 'Resource' },
			{ name: 'ShoutOuts', value: 'ShoutOut' },
			{ name: 'Smart Tips', value: 'SmartTip' },
			{ name: 'Smart Walk-Thrus', value: 'SmartWalkThru' },
			{ name: 'Surveys', value: 'Survey' },
		],
		default: [],
		description: 'Content types to include in export (leave empty for all)',
	},

	// ----------------------------------
	//         multiLanguage: importTranslations
	// ----------------------------------
	{
		displayName: 'Translation Data',
		name: 'translationData',
		type: 'json',
		required: true,
		displayOptions: {
			show: {
				resource: ['multiLanguage'],
				operation: ['importTranslations'],
			},
		},
		default: '{}',
		description: 'Translation data in JSON format',
	},
	{
		displayName: 'Import Options',
		name: 'importOptions',
		type: 'collection',
		placeholder: 'Add Option',
		displayOptions: {
			show: {
				resource: ['multiLanguage'],
				operation: ['importTranslations'],
			},
		},
		default: {},
		options: [
			{
				displayName: 'Overwrite Existing',
				name: 'overwriteExisting',
				type: 'boolean',
				default: false,
				description: 'Whether to overwrite existing translations',
			},
			{
				displayName: 'Publish Immediately',
				name: 'publishImmediately',
				type: 'boolean',
				default: false,
				description: 'Whether to publish translations immediately after import',
			},
		],
	},

	// ----------------------------------
	//         multiLanguage: updateTranslations
	// ----------------------------------
	{
		displayName: 'Translations',
		name: 'translations',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				resource: ['multiLanguage'],
				operation: ['updateTranslations'],
			},
		},
		default: {},
		options: [
			{
				displayName: 'Translation',
				name: 'translation',
				values: [
					{
						displayName: 'Key',
						name: 'key',
						type: 'string',
						default: '',
						description: 'The translation key',
					},
					{
						displayName: 'Value',
						name: 'value',
						type: 'string',
						default: '',
						description: 'The translated value',
					},
				],
			},
		],
		description: 'Specific translations to update',
	},
];
