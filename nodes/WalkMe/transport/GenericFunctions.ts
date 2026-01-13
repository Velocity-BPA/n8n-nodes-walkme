/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
	IDataObject,
	IExecuteFunctions,
	IHookFunctions,
	ILoadOptionsFunctions,
	IHttpRequestMethods,
	IHttpRequestOptions,
	JsonObject,
} from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';
import type {
	IWalkMeCredentials,
	IWalkMeTokenResponse,
	WalkMeRegion,
} from '../types/WalkMeTypes';

// Token cache to avoid unnecessary token requests
const tokenCache: Map<string, { token: string; expiresAt: number }> = new Map();

/**
 * Get the base URL for the WalkMe API based on region
 */
export function getBaseUrl(region: WalkMeRegion): string {
	switch (region) {
		case 'EU':
			return 'https://eu-api.walkme.com';
		case 'FedRAMP':
			return 'https://api.walkmegov.com';
		case 'Canada':
			return 'https://api-ca1.walkmedap.com';
		default:
			return 'https://api.walkme.com';
	}
}

/**
 * Get the mobile API base URL based on region
 */
export function getMobileBaseUrl(region: WalkMeRegion): string {
	switch (region) {
		case 'EU':
			return 'https://prodeu-dtapi.abbi.io';
		default:
			return 'https://dtapi.abbi.io';
	}
}

/**
 * Get OAuth2 access token from WalkMe
 */
export async function getAccessToken(
	this: IExecuteFunctions | IHookFunctions | ILoadOptionsFunctions,
	credentials: IWalkMeCredentials,
	scope?: string,
): Promise<string> {
	const cacheKey = `${credentials.username}:${credentials.region}:${scope || 'default'}`;
	const cached = tokenCache.get(cacheKey);

	// Return cached token if valid (with 60 second buffer)
	if (cached && cached.expiresAt > Date.now() + 60000) {
		return cached.token;
	}

	const baseUrl = getBaseUrl(credentials.region);
	const authString = Buffer.from(`${credentials.username}:${credentials.password}`).toString('base64');

	let body = 'grant_type=client_credentials';
	if (scope) {
		body += `&scope=${encodeURIComponent(scope)}`;
	}

	const options: IHttpRequestOptions = {
		method: 'POST',
		url: `${baseUrl}/accounts/connect/token`,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization: `Basic ${authString}`,
		},
		body,
	};

	try {
		const response = await this.helpers.httpRequest(options) as IWalkMeTokenResponse;
		const expiresAt = Date.now() + (response.expires_in * 1000);

		tokenCache.set(cacheKey, {
			token: response.access_token,
			expiresAt,
		});

		return response.access_token;
	} catch (error) {
		throw new NodeApiError(this.getNode(), error as JsonObject, {
			message: 'Failed to obtain access token',
		});
	}
}

/**
 * Make an authenticated request to the WalkMe API
 */
export async function walkMeApiRequest(
	this: IExecuteFunctions | IHookFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body?: IDataObject,
	query?: IDataObject,
	scope?: string,
): Promise<IDataObject> {
	const credentials = await this.getCredentials('walkMeApi') as unknown as IWalkMeCredentials;
	const accessToken = await getAccessToken.call(this, credentials, scope);
	const baseUrl = getBaseUrl(credentials.region);

	const options: IHttpRequestOptions = {
		method,
		url: `${baseUrl}${endpoint}`,
		headers: {
			Authorization: `Bearer ${accessToken}`,
			'Content-Type': 'application/json',
		},
		json: true,
	};

	if (body && Object.keys(body).length > 0) {
		options.body = body;
	}

	if (query && Object.keys(query).length > 0) {
		options.qs = query;
	}

	try {
		const response = await this.helpers.httpRequest(options);
		return response as IDataObject;
	} catch (error) {
		throw new NodeApiError(this.getNode(), error as JsonObject);
	}
}

/**
 * Make an authenticated request with pagination support
 */
export async function walkMeApiRequestAllItems(
	this: IExecuteFunctions | IHookFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body?: IDataObject,
	query?: IDataObject,
	limit?: number,
): Promise<IDataObject[]> {
	const returnData: IDataObject[] = [];
	let responseData: IDataObject[];
	let offset = 0;
	const pageSize = 100;

	query = query || {};

	do {
		query.offset = offset;
		query.limit = pageSize;

		const response = await walkMeApiRequest.call(this, method, endpoint, body, query);
		responseData = (response.data as IDataObject[]) || [];
		returnData.push(...responseData);
		offset += pageSize;

		// Check if we've reached the requested limit
		if (limit && returnData.length >= limit) {
			return returnData.slice(0, limit);
		}
	} while (responseData.length === pageSize);

	return returnData;
}

/**
 * Make a request to update end user data
 */
export async function walkMeEndUserRequest(
	this: IExecuteFunctions,
	integrationEndpoint: string,
	integrationToken: string,
	data: IDataObject[],
): Promise<IDataObject> {
	const credentials = await this.getCredentials('walkMeApi') as unknown as IWalkMeCredentials;
	const accessToken = await getAccessToken.call(this, credentials, 'endUserUpdate:write');

	const options: IHttpRequestOptions = {
		method: 'POST',
		url: integrationEndpoint,
		headers: {
			Authorization: `Bearer ${accessToken}`,
			'Content-Type': 'application/json',
		},
		body: {
			token: integrationToken,
			data,
		},
		json: true,
	};

	try {
		const response = await this.helpers.httpRequest(options);
		return response as IDataObject;
	} catch (error) {
		throw new NodeApiError(this.getNode(), error as JsonObject);
	}
}

/**
 * Handle WalkMe API errors with proper formatting
 */
export function handleWalkMeError(error: unknown): never {
	if (error instanceof NodeApiError) {
		throw error;
	}

	const errorObj = error as IDataObject;
	const message = (errorObj.message as string) || 'Unknown error occurred';
	const statusCode = (errorObj.statusCode as number) || 500;

	let errorMessage: string;
	switch (statusCode) {
		case 400:
			errorMessage = `Bad Request: ${message}`;
			break;
		case 401:
			errorMessage = 'Unauthorized: Invalid credentials or expired token';
			break;
		case 403:
			errorMessage = `Forbidden: ${message}. Check your API permissions.`;
			break;
		case 404:
			errorMessage = `Not Found: ${message}`;
			break;
		case 429:
			errorMessage = 'Rate Limited: Too many requests. Please try again later.';
			break;
		case 500:
			errorMessage = `Server Error: ${message}`;
			break;
		default:
			errorMessage = message;
	}

	throw new Error(errorMessage);
}

/**
 * Validate and format date string for API requests
 */
export function formatDateForApi(date: string): string {
	const parsed = new Date(date);
	if (isNaN(parsed.getTime())) {
		throw new Error(`Invalid date format: ${date}`);
	}
	return parsed.toISOString().split('T')[0];
}

/**
 * Build query parameters from options
 */
export function buildQueryParams(options: IDataObject): IDataObject {
	const query: IDataObject = {};

	for (const [key, value] of Object.entries(options)) {
		if (value !== undefined && value !== null && value !== '') {
			query[key] = value;
		}
	}

	return query;
}
