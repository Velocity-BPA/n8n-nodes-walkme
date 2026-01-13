/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import {
	getBaseUrl,
	getMobileBaseUrl,
	formatDateForApi,
	buildQueryParams,
} from '../../nodes/WalkMe/transport/GenericFunctions';

describe('GenericFunctions', () => {
	describe('getBaseUrl', () => {
		it('should return US URL by default', () => {
			expect(getBaseUrl('US')).toBe('https://api.walkme.com');
		});

		it('should return EU URL for EU region', () => {
			expect(getBaseUrl('EU')).toBe('https://eu-api.walkme.com');
		});

		it('should return FedRAMP URL for FedRAMP region', () => {
			expect(getBaseUrl('FedRAMP')).toBe('https://api.walkmegov.com');
		});

		it('should return Canada URL for Canada region', () => {
			expect(getBaseUrl('Canada')).toBe('https://api-ca1.walkmedap.com');
		});

		it('should default to US URL for unknown region', () => {
			expect(getBaseUrl('Unknown' as any)).toBe('https://api.walkme.com');
		});
	});

	describe('getMobileBaseUrl', () => {
		it('should return US mobile URL by default', () => {
			expect(getMobileBaseUrl('US')).toBe('https://dtapi.abbi.io');
		});

		it('should return EU mobile URL for EU region', () => {
			expect(getMobileBaseUrl('EU')).toBe('https://prodeu-dtapi.abbi.io');
		});

		it('should return US mobile URL for other regions', () => {
			expect(getMobileBaseUrl('FedRAMP')).toBe('https://dtapi.abbi.io');
			expect(getMobileBaseUrl('Canada')).toBe('https://dtapi.abbi.io');
		});
	});

	describe('formatDateForApi', () => {
		it('should format valid date string', () => {
			const result = formatDateForApi('2024-01-15T10:30:00Z');
			expect(result).toBe('2024-01-15');
		});

		it('should format date from Date object string', () => {
			const date = new Date('2024-06-20');
			const result = formatDateForApi(date.toISOString());
			expect(result).toBe('2024-06-20');
		});

		it('should throw error for invalid date', () => {
			expect(() => formatDateForApi('invalid-date')).toThrow(
				'Invalid date format: invalid-date'
			);
		});

		it('should handle different date formats', () => {
			expect(formatDateForApi('2024-12-31')).toBe('2024-12-31');
			expect(formatDateForApi('January 1, 2024')).toBe('2024-01-01');
		});
	});

	describe('buildQueryParams', () => {
		it('should build query params from object', () => {
			const options = {
				status: 'active',
				limit: 50,
			};
			const result = buildQueryParams(options);
			expect(result).toEqual({ status: 'active', limit: 50 });
		});

		it('should filter out undefined values', () => {
			const options = {
				status: 'active',
				filter: undefined,
			};
			const result = buildQueryParams(options);
			expect(result).toEqual({ status: 'active' });
		});

		it('should filter out null values', () => {
			const options = {
				status: 'active',
				filter: null,
			};
			const result = buildQueryParams(options);
			expect(result).toEqual({ status: 'active' });
		});

		it('should filter out empty strings', () => {
			const options = {
				status: 'active',
				filter: '',
			};
			const result = buildQueryParams(options);
			expect(result).toEqual({ status: 'active' });
		});

		it('should preserve zero values', () => {
			const options = {
				offset: 0,
				limit: 10,
			};
			const result = buildQueryParams(options);
			expect(result).toEqual({ offset: 0, limit: 10 });
		});

		it('should preserve false boolean values', () => {
			const options = {
				includeDeleted: false,
				active: true,
			};
			const result = buildQueryParams(options);
			expect(result).toEqual({ includeDeleted: false, active: true });
		});

		it('should handle empty object', () => {
			const result = buildQueryParams({});
			expect(result).toEqual({});
		});

		it('should handle arrays', () => {
			const options = {
				tags: ['a', 'b', 'c'],
			};
			const result = buildQueryParams(options);
			expect(result).toEqual({ tags: ['a', 'b', 'c'] });
		});
	});
});
