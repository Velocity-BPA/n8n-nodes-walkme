/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IDataObject } from 'n8n-workflow';

export type WalkMeRegion = 'US' | 'EU' | 'FedRAMP' | 'Canada';

export interface IWalkMeCredentials {
	username: string;
	password: string;
	region: WalkMeRegion;
}

export interface IWalkMeTokenResponse {
	access_token: string;
	token_type: string;
	expires_in: number;
	scope?: string;
}

export interface IWalkMeUser {
	id: string;
	email: string;
	firstName?: string;
	lastName?: string;
	role?: string;
	status?: string;
	permissions?: string[];
	createdAt?: string;
	updatedAt?: string;
}

export interface IWalkMeUserCreate {
	email: string;
	firstName?: string;
	lastName?: string;
	role?: string;
	permissions?: string[];
}

export interface IWalkMeUserUpdate {
	firstName?: string;
	lastName?: string;
	role?: string;
	permissions?: string[];
}

export interface IWalkMeEndUserAttribute {
	name: string;
	type: string;
	description?: string;
}

export interface IWalkMeEndUserUpdate {
	userIdentifier: string;
	attributes: IDataObject;
}

export interface IWalkMeContent {
	id: string;
	name: string;
	type: WalkMeContentType;
	status: string;
	environment?: string;
	createdAt?: string;
	updatedAt?: string;
	publishedAt?: string;
}

export type WalkMeContentType =
	| 'SmartWalkThru'
	| 'Resource'
	| 'Survey'
	| 'ShoutOut'
	| 'Launcher'
	| 'Shuttle'
	| 'SmartTip';

export interface IWalkMeAnalyticsParams {
	startDate: string;
	endDate: string;
	contentId?: string;
	metrics?: string[];
	groupBy?: string;
}

export interface IWalkMeAnalyticsResponse {
	data: IDataObject[];
	summary?: IDataObject;
	period?: {
		startDate: string;
		endDate: string;
	};
}

export interface IWalkMeTranslation {
	language: string;
	content: IDataObject;
}

export interface IWalkMeDiscoveryApp {
	id: string;
	name: string;
	domain: string;
	category?: string;
	usageCount?: number;
	lastAccessed?: string;
}

export interface IWalkMeChecksum {
	checksum: string;
	environment: string;
	lastPublished?: string;
}

export interface IWalkMePaginationParams {
	offset?: number;
	limit?: number;
}

export interface IWalkMeApiResponse<T = IDataObject> {
	data: T;
	pagination?: {
		offset: number;
		limit: number;
		total: number;
	};
}

export interface IWalkMeErrorResponse {
	error: string;
	message: string;
	statusCode: number;
	details?: IDataObject;
}

export type WalkMeResource =
	| 'user'
	| 'endUser'
	| 'content'
	| 'analytics'
	| 'multiLanguage'
	| 'discovery'
	| 'checksum';

export type UserOperation =
	| 'list'
	| 'get'
	| 'create'
	| 'update'
	| 'delete'
	| 'assignRole';

export type EndUserOperation =
	| 'update'
	| 'bulkUpdate'
	| 'getAttributes';

export type ContentOperation =
	| 'list'
	| 'get'
	| 'publish'
	| 'unpublish';

export type AnalyticsOperation =
	| 'get'
	| 'getContentPerformance'
	| 'getUserEngagement';

export type MultiLanguageOperation =
	| 'exportTranslations'
	| 'importTranslations'
	| 'listLanguages';

export type DiscoveryOperation =
	| 'getAppsStats'
	| 'listApps';

export type ChecksumOperation = 'get';
