/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import { WalkMe } from '../../nodes/WalkMe/WalkMe.node';
import { WalkMeTrigger } from '../../nodes/WalkMe/WalkMeTrigger.node';

describe('WalkMe Node', () => {
	let walkMe: WalkMe;

	beforeEach(() => {
		walkMe = new WalkMe();
	});

	describe('Node Description', () => {
		it('should have correct display name', () => {
			expect(walkMe.description.displayName).toBe('WalkMe');
		});

		it('should have correct node name', () => {
			expect(walkMe.description.name).toBe('walkMe');
		});

		it('should have version 1', () => {
			expect(walkMe.description.version).toBe(1);
		});

		it('should require walkMeApi credentials', () => {
			expect(walkMe.description.credentials).toEqual([
				{
					name: 'walkMeApi',
					required: true,
				},
			]);
		});

		it('should have all 12 required resources', () => {
			const resourceProperty = walkMe.description.properties.find(
				(p) => p.name === 'resource'
			);
			expect(resourceProperty).toBeDefined();
			
			const resourceOptions = resourceProperty?.options as Array<{ value: string }>;
			const resourceValues = resourceOptions?.map((o) => o.value);
			
			// All 12 resources
			expect(resourceValues).toContain('user');
			expect(resourceValues).toContain('endUser');
			expect(resourceValues).toContain('content');
			expect(resourceValues).toContain('analytics');
			expect(resourceValues).toContain('multiLanguage');
			expect(resourceValues).toContain('discovery');
			expect(resourceValues).toContain('checksum');
			expect(resourceValues).toContain('system');
			expect(resourceValues).toContain('segment');
			expect(resourceValues).toContain('goal');
			expect(resourceValues).toContain('selfHosted');
			expect(resourceValues).toContain('apiKey');
			
			// Should have exactly 12 resources
			expect(resourceValues?.length).toBe(12);
		});
	});

	describe('User Resource', () => {
		it('should have all user operations', () => {
			const userOperations = walkMe.description.properties.find(
				(p) => p.name === 'operation' && 
				p.displayOptions?.show?.resource?.includes('user')
			);
			
			expect(userOperations).toBeDefined();
			
			const operationOptions = userOperations?.options as Array<{ value: string }>;
			const operationValues = operationOptions?.map((o) => o.value);
			
			expect(operationValues).toContain('list');
			expect(operationValues).toContain('get');
			expect(operationValues).toContain('create');
			expect(operationValues).toContain('update');
			expect(operationValues).toContain('delete');
			expect(operationValues).toContain('assignRole');
			expect(operationValues).toContain('removeRole');
			expect(operationValues).toContain('listRoles');
			expect(operationValues).toContain('getPermissions');
			expect(operationValues).toContain('activate');
			expect(operationValues).toContain('deactivate');
			expect(operationValues).toContain('resetPassword');
		});
	});

	describe('End User Resource', () => {
		it('should have all end user operations', () => {
			const endUserOperations = walkMe.description.properties.find(
				(p) => p.name === 'operation' && 
				p.displayOptions?.show?.resource?.includes('endUser')
			);
			
			expect(endUserOperations).toBeDefined();
			
			const operationOptions = endUserOperations?.options as Array<{ value: string }>;
			const operationValues = operationOptions?.map((o) => o.value);
			
			expect(operationValues).toContain('update');
			expect(operationValues).toContain('bulkUpdate');
			expect(operationValues).toContain('get');
			expect(operationValues).toContain('getAttributes');
			expect(operationValues).toContain('createAttributeDefinition');
			expect(operationValues).toContain('deleteAttributeDefinition');
			expect(operationValues).toContain('getSegments');
			expect(operationValues).toContain('listIntegrations');
		});
	});

	describe('Content Resource', () => {
		it('should have all content operations', () => {
			const contentOperations = walkMe.description.properties.find(
				(p) => p.name === 'operation' && 
				p.displayOptions?.show?.resource?.includes('content')
			);
			
			expect(contentOperations).toBeDefined();
			
			const operationOptions = contentOperations?.options as Array<{ value: string }>;
			const operationValues = operationOptions?.map((o) => o.value);
			
			expect(operationValues).toContain('list');
			expect(operationValues).toContain('get');
			expect(operationValues).toContain('publish');
			expect(operationValues).toContain('unpublish');
			expect(operationValues).toContain('getAnalytics');
			expect(operationValues).toContain('listSmartWalkThrus');
			expect(operationValues).toContain('listResources');
			expect(operationValues).toContain('listShoutOuts');
			expect(operationValues).toContain('listLaunchers');
			expect(operationValues).toContain('listSurveys');
			expect(operationValues).toContain('getVersions');
			expect(operationValues).toContain('rollback');
		});
	});

	describe('Analytics Resource', () => {
		it('should have all analytics operations', () => {
			const analyticsOperations = walkMe.description.properties.find(
				(p) => p.name === 'operation' && 
				p.displayOptions?.show?.resource?.includes('analytics')
			);
			
			expect(analyticsOperations).toBeDefined();
			
			const operationOptions = analyticsOperations?.options as Array<{ value: string }>;
			const operationValues = operationOptions?.map((o) => o.value);
			
			expect(operationValues).toContain('getOverview');
			expect(operationValues).toContain('getCompletionRates');
			expect(operationValues).toContain('getContentPerformance');
			expect(operationValues).toContain('getUserEngagement');
			expect(operationValues).toContain('getFunnelAnalysis');
			expect(operationValues).toContain('getTimeToComplete');
			expect(operationValues).toContain('getUserJourneys');
			expect(operationValues).toContain('getGoalMetrics');
			expect(operationValues).toContain('export');
		});
	});

	describe('Multi-Language Resource', () => {
		it('should have all multi-language operations', () => {
			const multiLanguageOperations = walkMe.description.properties.find(
				(p) => p.name === 'operation' && 
				p.displayOptions?.show?.resource?.includes('multiLanguage')
			);
			
			expect(multiLanguageOperations).toBeDefined();
			
			const operationOptions = multiLanguageOperations?.options as Array<{ value: string }>;
			const operationValues = operationOptions?.map((o) => o.value);
			
			expect(operationValues).toContain('listLanguages');
			expect(operationValues).toContain('getLanguage');
			expect(operationValues).toContain('addLanguage');
			expect(operationValues).toContain('removeLanguage');
			expect(operationValues).toContain('exportTranslations');
			expect(operationValues).toContain('importTranslations');
			expect(operationValues).toContain('getTranslationStatus');
			expect(operationValues).toContain('updateTranslations');
		});
	});

	describe('Discovery Resource', () => {
		it('should have all discovery operations', () => {
			const discoveryOperations = walkMe.description.properties.find(
				(p) => p.name === 'operation' && 
				p.displayOptions?.show?.resource?.includes('discovery')
			);
			
			expect(discoveryOperations).toBeDefined();
			
			const operationOptions = discoveryOperations?.options as Array<{ value: string }>;
			const operationValues = operationOptions?.map((o) => o.value);
			
			expect(operationValues).toContain('getStats');
			expect(operationValues).toContain('listApps');
			expect(operationValues).toContain('getAppDetails');
			expect(operationValues).toContain('categorizeApp');
			expect(operationValues).toContain('addTag');
			expect(operationValues).toContain('removeTag');
			expect(operationValues).toContain('getAppUsers');
			expect(operationValues).toContain('getAppTrends');
			expect(operationValues).toContain('exportReport');
		});
	});

	describe('Checksum Resource', () => {
		it('should have all checksum operations', () => {
			const checksumOperations = walkMe.description.properties.find(
				(p) => p.name === 'operation' && 
				p.displayOptions?.show?.resource?.includes('checksum')
			);
			
			expect(checksumOperations).toBeDefined();
			
			const operationOptions = checksumOperations?.options as Array<{ value: string }>;
			const operationValues = operationOptions?.map((o) => o.value);
			
			expect(operationValues).toContain('get');
			expect(operationValues).toContain('verify');
			expect(operationValues).toContain('compare');
		});
	});

	describe('System Resource', () => {
		it('should have all system operations', () => {
			const systemOperations = walkMe.description.properties.find(
				(p) => p.name === 'operation' && 
				p.displayOptions?.show?.resource?.includes('system')
			);
			
			expect(systemOperations).toBeDefined();
			
			const operationOptions = systemOperations?.options as Array<{ value: string }>;
			const operationValues = operationOptions?.map((o) => o.value);
			
			expect(operationValues).toContain('list');
			expect(operationValues).toContain('get');
			expect(operationValues).toContain('create');
			expect(operationValues).toContain('update');
			expect(operationValues).toContain('delete');
			expect(operationValues).toContain('getSettings');
			expect(operationValues).toContain('updateSettings');
			expect(operationValues).toContain('getInstallationScript');
		});
	});

	describe('Segment Resource', () => {
		it('should have all segment operations', () => {
			const segmentOperations = walkMe.description.properties.find(
				(p) => p.name === 'operation' && 
				p.displayOptions?.show?.resource?.includes('segment')
			);
			
			expect(segmentOperations).toBeDefined();
			
			const operationOptions = segmentOperations?.options as Array<{ value: string }>;
			const operationValues = operationOptions?.map((o) => o.value);
			
			expect(operationValues).toContain('list');
			expect(operationValues).toContain('get');
			expect(operationValues).toContain('create');
			expect(operationValues).toContain('update');
			expect(operationValues).toContain('delete');
			expect(operationValues).toContain('getMembers');
			expect(operationValues).toContain('getAnalytics');
			expect(operationValues).toContain('clone');
		});
	});

	describe('Goal Resource', () => {
		it('should have all goal operations', () => {
			const goalOperations = walkMe.description.properties.find(
				(p) => p.name === 'operation' && 
				p.displayOptions?.show?.resource?.includes('goal')
			);
			
			expect(goalOperations).toBeDefined();
			
			const operationOptions = goalOperations?.options as Array<{ value: string }>;
			const operationValues = operationOptions?.map((o) => o.value);
			
			expect(operationValues).toContain('list');
			expect(operationValues).toContain('get');
			expect(operationValues).toContain('create');
			expect(operationValues).toContain('update');
			expect(operationValues).toContain('delete');
			expect(operationValues).toContain('getProgress');
			expect(operationValues).toContain('getTrends');
			expect(operationValues).toContain('associateContent');
		});
	});

	describe('Self-Hosted Resource', () => {
		it('should have all self-hosted operations', () => {
			const selfHostedOperations = walkMe.description.properties.find(
				(p) => p.name === 'operation' && 
				p.displayOptions?.show?.resource?.includes('selfHosted')
			);
			
			expect(selfHostedOperations).toBeDefined();
			
			const operationOptions = selfHostedOperations?.options as Array<{ value: string }>;
			const operationValues = operationOptions?.map((o) => o.value);
			
			expect(operationValues).toContain('listVersions');
			expect(operationValues).toContain('getLatestVersion');
			expect(operationValues).toContain('downloadFiles');
			expect(operationValues).toContain('downloadVersion');
		});
	});

	describe('API Key Resource', () => {
		it('should have all api key operations', () => {
			const apiKeyOperations = walkMe.description.properties.find(
				(p) => p.name === 'operation' && 
				p.displayOptions?.show?.resource?.includes('apiKey')
			);
			
			expect(apiKeyOperations).toBeDefined();
			
			const operationOptions = apiKeyOperations?.options as Array<{ value: string }>;
			const operationValues = operationOptions?.map((o) => o.value);
			
			expect(operationValues).toContain('list');
			expect(operationValues).toContain('create');
			expect(operationValues).toContain('update');
			expect(operationValues).toContain('delete');
			expect(operationValues).toContain('rotate');
		});
	});
});

describe('WalkMe Trigger Node', () => {
	let walkMeTrigger: WalkMeTrigger;

	beforeEach(() => {
		walkMeTrigger = new WalkMeTrigger();
	});

	describe('Node Description', () => {
		it('should have correct display name', () => {
			expect(walkMeTrigger.description.displayName).toBe('WalkMe Trigger');
		});

		it('should have correct node name', () => {
			expect(walkMeTrigger.description.name).toBe('walkMeTrigger');
		});

		it('should be in trigger group', () => {
			expect(walkMeTrigger.description.group).toContain('trigger');
		});

		it('should have no inputs', () => {
			expect(walkMeTrigger.description.inputs).toEqual([]);
		});

		it('should have main output', () => {
			expect(walkMeTrigger.description.outputs).toEqual(['main']);
		});

		it('should have all supported events', () => {
			const eventProperty = walkMeTrigger.description.properties.find(
				(p) => p.name === 'event'
			);
			expect(eventProperty).toBeDefined();
			
			const eventOptions = eventProperty?.options as Array<{ value: string }>;
			const eventValues = eventOptions?.map((o) => o.value);
			
			expect(eventValues).toContain('content.completed');
			expect(eventValues).toContain('content.started');
			expect(eventValues).toContain('content.abandoned');
			expect(eventValues).toContain('goal.achieved');
			expect(eventValues).toContain('survey.submitted');
			expect(eventValues).toContain('segment.entered');
			expect(eventValues).toContain('segment.exited');
			expect(eventValues).toContain('error.occurred');
			expect(eventValues).toContain('launcher.clicked');
		});

		it('should have secret field', () => {
			const secretProperty = walkMeTrigger.description.properties.find(
				(p) => p.name === 'secret'
			);
			expect(secretProperty).toBeDefined();
			expect(secretProperty?.type).toBe('string');
		});

		it('should have webhook defined', () => {
			expect(walkMeTrigger.description.webhooks).toBeDefined();
			expect(walkMeTrigger.description.webhooks?.length).toBeGreaterThan(0);
		});
	});
});
