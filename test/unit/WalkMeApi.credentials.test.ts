/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import { WalkMeApi } from '../../credentials/WalkMeApi.credentials';

describe('WalkMeApi Credentials', () => {
	let credentials: WalkMeApi;

	beforeEach(() => {
		credentials = new WalkMeApi();
	});

	describe('Credential Configuration', () => {
		it('should have correct name', () => {
			expect(credentials.name).toBe('walkMeApi');
		});

		it('should have correct display name', () => {
			expect(credentials.displayName).toBe('WalkMe API');
		});

		it('should have documentation URL', () => {
			expect(credentials.documentationUrl).toBe(
				'https://developer.walkme.com/reference/introduction'
			);
		});
	});

	describe('Properties', () => {
		it('should have username property', () => {
			const usernameProperty = credentials.properties.find(
				(p) => p.name === 'username'
			);
			
			expect(usernameProperty).toBeDefined();
			expect(usernameProperty?.type).toBe('string');
			expect(usernameProperty?.required).toBe(true);
		});

		it('should have password property with password type', () => {
			const passwordProperty = credentials.properties.find(
				(p) => p.name === 'password'
			);
			
			expect(passwordProperty).toBeDefined();
			expect(passwordProperty?.type).toBe('string');
			expect(passwordProperty?.typeOptions?.password).toBe(true);
			expect(passwordProperty?.required).toBe(true);
		});

		it('should have region property with correct options', () => {
			const regionProperty = credentials.properties.find(
				(p) => p.name === 'region'
			);
			
			expect(regionProperty).toBeDefined();
			expect(regionProperty?.type).toBe('options');
			expect(regionProperty?.required).toBe(true);
			
			const options = regionProperty?.options as Array<{ value: string }>;
			const values = options?.map((o) => o.value);
			
			expect(values).toContain('US');
			expect(values).toContain('EU');
			expect(values).toContain('FedRAMP');
			expect(values).toContain('Canada');
		});

		it('should default to US region', () => {
			const regionProperty = credentials.properties.find(
				(p) => p.name === 'region'
			);
			
			expect(regionProperty?.default).toBe('US');
		});
	});

	describe('Authentication', () => {
		it('should have generic authenticate type', () => {
			expect(credentials.authenticate).toBeDefined();
			expect(credentials.authenticate.type).toBe('generic');
		});
	});

	describe('Test Request', () => {
		it('should have test request configured', () => {
			expect(credentials.test).toBeDefined();
			expect(credentials.test.request).toBeDefined();
		});

		it('should use POST method for token request', () => {
			expect(credentials.test.request.method).toBe('POST');
		});

		it('should target token endpoint', () => {
			expect(credentials.test.request.url).toBe('/accounts/connect/token');
		});

		it('should use form-urlencoded content type', () => {
			expect(credentials.test.request.headers?.['Content-Type']).toBe(
				'application/x-www-form-urlencoded'
			);
		});
	});
});
