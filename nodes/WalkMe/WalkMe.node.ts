/**
 * Copyright (c) 2026 Velocity BPA
 * 
 * Licensed under the Business Source License 1.1 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     https://github.com/VelocityBPA/n8n-nodes-walkme/blob/main/LICENSE
 * 
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  NodeOperationError,
  NodeApiError,
} from 'n8n-workflow';

export class WalkMe implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'WalkMe',
    name: 'walkme',
    icon: 'file:walkme.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Interact with the WalkMe API',
    defaults: {
      name: 'WalkMe',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        name: 'walkmeApi',
        required: true,
      },
    ],
    properties: [
      // Resource selector
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        noDataExpression: true,
        options: [
          {
            name: 'Users',
            value: 'users',
          },
          {
            name: 'Analytics',
            value: 'analytics',
          },
          {
            name: 'Content',
            value: 'content',
          },
          {
            name: 'Segments',
            value: 'segments',
          },
          {
            name: 'Organizations',
            value: 'organizations',
          },
          {
            name: 'Walkthroughs',
            value: 'walkthroughs',
          },
          {
            name: 'SmartTips',
            value: 'smartTips',
          }
        ],
        default: 'users',
      },
      // Operation dropdowns per resource
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['users'],
    },
  },
  options: [
    {
      name: 'Get Users',
      value: 'getUsers',
      description: 'Retrieve all users with pagination',
      action: 'Get users',
    },
    {
      name: 'Get User',
      value: 'getUser',
      description: 'Get specific user details',
      action: 'Get user',
    },
    {
      name: 'Create User',
      value: 'createUser',
      description: 'Create a new user account',
      action: 'Create user',
    },
    {
      name: 'Update User',
      value: 'updateUser',
      description: 'Update existing user information',
      action: 'Update user',
    },
    {
      name: 'Delete User',
      value: 'deleteUser',
      description: 'Remove user from organization',
      action: 'Delete user',
    },
    {
      name: 'Bulk Create Users',
      value: 'bulkCreateUsers',
      description: 'Create multiple users in batch',
      action: 'Bulk create users',
    },
    {
      name: 'Get User Activity',
      value: 'getUserActivity',
      description: 'Get user activity history',
      action: 'Get user activity',
    },
  ],
  default: 'getUsers',
},
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['analytics'],
    },
  },
  options: [
    {
      name: 'Get Events',
      value: 'getEvents',
      description: 'Retrieve user interaction events',
      action: 'Get events',
    },
    {
      name: 'Get Sessions',
      value: 'getSessions',
      description: 'Get user session data',
      action: 'Get sessions',
    },
    {
      name: 'Get Content Analytics',
      value: 'getContentAnalytics',
      description: 'Retrieve content performance metrics',
      action: 'Get content analytics',
    },
    {
      name: 'Create Event',
      value: 'createEvent',
      description: 'Track custom user events',
      action: 'Create event',
    },
    {
      name: 'Get Reports',
      value: 'getReports',
      description: 'Generate analytics reports',
      action: 'Get reports',
    },
    {
      name: 'Get Funnels',
      value: 'getFunnels',
      description: 'Retrieve funnel analysis data',
      action: 'Get funnels',
    },
    { 
      name: 'Get Insights', 
      value: 'getInsights', 
      description: 'Retrieve analytics insights', 
      action: 'Get insights' 
    },
    { 
      name: 'Get Engagement', 
      value: 'getEngagement', 
      description: 'Get engagement metrics', 
      action: 'Get engagement' 
    },
    { 
      name: 'Get Goals', 
      value: 'getGoals', 
      description: 'Get goal completion data', 
      action: 'Get goals' 
    },
    { 
      name: 'Get Segments', 
      value: 'getSegments', 
      description: 'List available user segments', 
      action: 'Get segments' 
    },
    { 
      name: 'Track Custom Event', 
      value: 'trackCustomEvent', 
      description: 'Track custom analytics events', 
      action: 'Track custom event' 
    }
  ],
  default: 'getEvents',
},
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['content'],
    },
  },
  options: [
    {
      name: 'Get Content',
      value: 'getContent',
      description: 'List all content items',
      action: 'Get content',
    },
    {
      name: 'Get Content Item',
      value: 'getContentItem',
      description: 'Get specific content details',
      action: 'Get content item',
    },
    {
      name: 'Create Content',
      value: 'createContent',
      description: 'Create new content item',
      action: 'Create content',
    },
    {
      name: 'Update Content',
      value: 'updateContent',
      description: 'Update existing content',
      action: 'Update content',
    },
    {
      name: 'Delete Content',
      value: 'deleteContent',
      description: 'Remove content item',
      action: 'Delete content',
    },
    {
      name: 'Publish Content',
      value: 'publishContent',
      description: 'Publish content to users',
      action: 'Publish content',
    },
  ],
  default: 'getContent',
},
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['segments'],
    },
  },
  options: [
    {
      name: 'Get All Segments',
      value: 'getSegments',
      description: 'Retrieve all user segments',
      action: 'Get all segments',
    },
    {
      name: 'Get Segment',
      value: 'getSegment',
      description: 'Get specific segment details',
      action: 'Get segment details',
    },
    {
      name: 'Create Segment',
      value: 'createSegment',
      description: 'Create new user segment',
      action: 'Create segment',
    },
    {
      name: 'Update Segment',
      value: 'updateSegment',
      description: 'Update segment conditions',
      action: 'Update segment',
    },
    {
      name: 'Delete Segment',
      value: 'deleteSegment',
      description: 'Remove user segment',
      action: 'Delete segment',
    },
    {
      name: 'Get Segment Users',
      value: 'getSegmentUsers',
      description: 'Get users in segment',
      action: 'Get segment users',
    },
  ],
  default: 'getSegments',
},
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['organizations'],
    },
  },
  options: [
    {
      name: 'Get Organizations',
      value: 'getOrganizations',
      description: 'List accessible organizations',
      action: 'Get organizations',
    },
    {
      name: 'Get Organization',
      value: 'getOrganization',
      description: 'Get organization details',
      action: 'Get organization',
    },
    {
      name: 'Update Organization',
      value: 'updateOrganization',
      description: 'Update organization settings',
      action: 'Update organization',
    },
    {
      name: 'Get Environments',
      value: 'getEnvironments',
      description: 'List organization environments',
      action: 'Get environments',
    },
    {
      name: 'Create Environment',
      value: 'createEnvironment',
      description: 'Create new environment',
      action: 'Create environment',
    },
    {
      name: 'Update Environment',
      value: 'updateEnvironment',
      description: 'Update environment settings',
      action: 'Update environment',
    },
  ],
  default: 'getOrganizations',
},
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: { show: { resource: ['walkthroughs'] } },
	options: [
		{ name: 'Get All Walkthroughs', value: 'getWalkthroughs', description: 'List all walkthroughs', action: 'Get all walkthroughs' },
		{ name: 'Get Walkthrough', value: 'getWalkthrough', description: 'Get specific walkthrough', action: 'Get walkthrough' },
		{ name: 'Create Walkthrough', value: 'createWalkthrough', description: 'Create new walkthrough', action: 'Create walkthrough' },
		{ name: 'Update Walkthrough', value: 'updateWalkthrough', description: 'Update walkthrough', action: 'Update walkthrough' },
		{ name: 'Delete Walkthrough', value: 'deleteWalkthrough', description: 'Delete walkthrough', action: 'Delete walkthrough' },
		{ name: 'Publish Walkthrough', value: 'publishWalkthrough', description: 'Publish walkthrough to users', action: 'Publish walkthrough' },
	],
	default: 'getWalkthroughs',
},
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['smartTips'] } },
  options: [
    { name: 'Get Smart Tips', value: 'getSmartTips', description: 'List all smart tips', action: 'Get smart tips' },
    { name: 'Get Smart Tip', value: 'getSmartTip', description: 'Get specific smart tip', action: 'Get smart tip' },
    { name: 'Create Smart Tip', value: 'createSmartTip', description: 'Create new smart tip', action: 'Create smart tip' },
    { name: 'Update Smart Tip', value: 'updateSmartTip', description: 'Update smart tip', action: 'Update smart tip' },
    { name: 'Delete Smart Tip', value: 'deleteSmartTip', description: 'Delete smart tip', action: 'Delete smart tip' },
    { name: 'Get Smart Tip Analytics', value: 'getSmartTipAnalytics', description: 'Get tip performance data', action: 'Get smart tip analytics' },
  ],
  default: 'getSmartTips',
},
      // Parameter definitions
{
  displayName: 'Organization ID',
  name: 'organizationId',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['users'],
      operation: ['getUsers', 'getUser', 'createUser', 'deleteUser', 'bulkCreateUsers'],
    },
  },
  default: '',
  description: 'The organization ID',
},
{
  displayName: 'Page',
  name: 'page',
  type: 'number',
  displayOptions: {
    show: {
      resource: ['users'],
      operation: ['getUsers'],
    },
  },
  default: 1,
  description: 'Page number for pagination',
},
{
  displayName: 'Limit',
  name: 'limit',
  type: 'number',
  displayOptions: {
    show: {
      resource: ['users'],
      operation: ['getUsers'],
    },
  },
  default: 50,
  description: 'Number of users per page',
},
{
  displayName: 'Filter',
  name: 'filter',
  type: 'string',
  default: '',
  description: 'Filter users by criteria',
  displayOptions: {
    show: {
      resource: ['users'],
      operation: ['getUsers'],
    },
  },
},
{
  displayName: 'User ID',
  name: 'userId',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['users'],
      operation: ['getUser', 'updateUser', 'deleteUser', 'getUserActivity'],
    },
  },
  default: '',
  description: 'The user ID',
},
{
  displayName: 'Email',
  name: 'email',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['users'],
      operation: ['createUser'],
    },
  },
  default: '',
  description: 'User email address',
},
{
  displayName: 'Email',
  name: 'email',
  type: 'string',
  displayOptions: {
    show: {
      resource: ['users'],
      operation: ['updateUser'],
    },
  },
  default: '',
  description: 'User email address',
},
{
  displayName: 'Name',
  name: 'name',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['users'],
      operation: ['createUser'],
    },
  },
  default: '',
  description: 'User full name',
},
{
  displayName: 'Name',
  name: 'name',
  type: 'string',
  displayOptions: {
    show: {
      resource: ['users'],
      operation: ['updateUser'],
    },
  },
  default: '',
  description: 'User full name',
},
{
  displayName: 'Role',
  name: 'role',
  type: 'string',
  default: '',
  description: 'User role in the organization',
  displayOptions: {
    show: {
      resource: ['users'],
      operation: ['createUser', 'updateUser'],
    },
  },
},
{
  displayName: 'Department',
  name: 'department',
  type: 'string',
  default: '',
  description: 'User department',
  displayOptions: {
    show: {
      resource: ['users'],
      operation: ['createUser', 'updateUser'],
    },
  },
},
{
  displayName: 'Properties',
  name: 'properties',
  type: 'fixedCollection',
  typeOptions: {
    multipleValues: true,
  },
  displayOptions: {
    show: {
      resource: ['users'],
      operation: ['createUser', 'updateUser'],
    },
  },
  default: {},
  description: 'Additional user properties',
  options: [
    {
      name: 'property',
      displayName: 'Property',
      values: [
        {
          displayName: 'Key',
          name: 'key',
          type: 'string',
          default: '',
          description: 'Property key',
        },
        {
          displayName: 'Value',
          name: 'value',
          type: 'string',
          default: '',
          description: 'Property value',
        },
      ],
    },
  ],
},
{
  displayName: 'Users',
  name: 'users',
  type: 'json',
  required: true,
  displayOptions: {
    show: {
      resource: ['users'],
      operation: ['bulkCreateUsers'],
    },
  },
  default: '[]',
  description: 'Array of users to create in bulk. Each user should have email, name, and optionally properties.',
},
{
  displayName: 'Start Date',
  name: 'startDate',
  type: 'dateTime',
  default: '',
  description: 'Start date for activity history (ISO 8601 format)',
  displayOptions: {
    show: {
      resource: ['users'],
      operation: ['getUserActivity'],
    },
  },
},
{
  displayName: 'End Date',
  name: 'endDate',
  type: 'dateTime',
  default: '',
  description: 'End date for activity history (ISO 8601 format)',
  displayOptions: {
    show: {
      resource: ['users'],
      operation: ['getUserActivity'],
    },
  },
},
{
  displayName: 'Start Date',
  name: 'startDate',
  type: 'dateTime',
  required: true,
  displayOptions: {
    show: {
      resource: ['analytics'],
      operation: ['getEvents', 'getSessions', 'getContentAnalytics', 'getReports', 'getFunnels', 'getInsights', 'getEngagement', 'getGoals'],
    },
  },
  default: '',
  description: 'The start date for the data range',
},
{
  displayName: 'End Date',
  name: 'endDate',
  type: 'dateTime',
  required: true,
  displayOptions: {
    show: {
      resource: ['analytics'],
      operation: ['getEvents', 'getSessions', 'getContentAnalytics', 'getReports', 'getFunnels', 'getInsights', 'getEngagement', 'getGoals'],
    },
  },
  default: '',
  description: 'The end date for the data range',
},
{
  displayName: 'Event Type',
  name: 'eventType',
  type: 'string',
  required: false,
  displayOptions: {
    show: {
      resource: ['analytics'],
      operation: ['getEvents', 'createEvent'],
    },
  },
  default: '',
  description: 'Filter events by type',
},
{
  displayName: 'User ID',
  name: 'userId',
  type: 'string',
  required: false,
  displayOptions: {
    show: {
      resource: ['analytics'],
      operation: ['getEvents', 'getSessions'],
    },
  },
  default: '',
  description: 'Filter by specific user ID',
},
{
  displayName: 'User ID',
  name: 'userId',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['analytics'],
      operation: ['createEvent', 'trackCustomEvent'],
    },
  },
  default: '',
  description: 'User ID for the event',
},
{
  displayName: 'Organization ID',
  name: 'organizationId',
  type: 'string',
  required: false,
  displayOptions: {
    show: {
      resource: ['analytics'],
      operation: ['getSessions'],
    },
  },
  default: '',
  description: 'Filter by organization ID',
},
{
  displayName: 'Content ID',
  name: 'contentId',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['analytics'],
      operation: ['getContentAnalytics'],
    },
  },
  default: '',
  description: 'The content ID to analyze',
},
{
  displayName: 'Properties',
  name: 'properties',
  type: 'json',
  required: false,
  displayOptions: {
    show: {
      resource: ['analytics'],
      operation: ['createEvent', 'trackCustomEvent'],
    },
  },
  default: '{}',
  description: 'Event properties as JSON object',
},
{
  displayName: 'Timestamp',
  name: 'timestamp',
  type: 'dateTime',
  required: false,
  displayOptions: {
    show: {
      resource: ['analytics'],
      operation: ['createEvent'],
    },
  },
  default: '',
  description: 'Event timestamp (defaults to current time)',
},
{
  displayName: 'Report Type',
  name: 'reportType',
  type: 'options',
  required: true,
  displayOptions: {
    show: {
      resource: ['analytics'],
      operation: ['getReports'],
    },
  },
  options: [
    { name: 'User Engagement', value: 'user_engagement' },
    { name: 'Content Performance', value: 'content_performance' },
    { name: 'Goal Completion', value: 'goal_completion' },
    { name: 'Session Analysis', value: 'session_analysis' },
  ],
  default: 'user_engagement',
  description: 'Type of report to generate',
},
{
  displayName: 'Filters',
  name: 'filters',
  type: 'json',
  required: false,
  displayOptions: {
    show: {
      resource: ['analytics'],
      operation: ['getReports'],
    },
  },
  default: '{}',
  description: 'Additional filters for the report as JSON object',
},
{
  displayName: 'Funnel ID',
  name: 'funnelId',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['analytics'],
      operation: ['getFunnels'],
    },
  },
  default: '',
  description: 'The funnel ID to analyze',
},
{
  displayName: 'Metric',
  name: 'metric',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['analytics'],
      operation: ['getInsights']
    }
  },
  default: '',
  description: 'The metric to retrieve insights for',
},
{
  displayName: 'Segment ID',
  name: 'segmentId',
  type: 'string',
  required: false,
  displayOptions: {
    show: {
      resource: ['analytics'],
      operation: ['getEngagement']
    }
  },
  default: '',
  description: 'ID of the user segment to filter engagement metrics',
},
{
  displayName: 'Goal ID',
  name: 'goalId',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['analytics'],
      operation: ['getGoals']
    }
  },
  default: '',
  description: 'ID of the goal to retrieve completion data for',
},
{
  displayName: 'Event Name',
  name: 'eventName',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['analytics'],
      operation: ['trackCustomEvent']
    }
  },
  default: '',
  description: 'Name of the custom event to track',
},
{
  displayName: 'Content Type',
  name: 'contentType',
  type: 'options',
  displayOptions: {
    show: {
      resource: ['content'],
      operation: ['getContent'],
    },
  },
  options: [
    {
      name: 'All',
      value: '',
    },
    {
      name: 'Walk-Thru',
      value: 'walkthru',
    },
    {
      name: 'SmartTip',
      value: 'smarttip',
    },
    {
      name: 'ShoutOut',
      value: 'shoutout',
    },
    {
      name: 'Launcher',
      value: 'launcher',
    },
  ],
  default: '',
  description: 'Filter by content type',
},
{
  displayName: 'Status',
  name: 'status',
  type: 'options',
  displayOptions: {
    show: {
      resource: ['content'],
      operation: ['getContent'],
    },
  },
  options: [
    {
      name: 'All',
      value: '',
    },
    {
      name: 'Draft',
      value: 'draft',
    },
    {
      name: 'Published',
      value: 'published',
    },
    {
      name: 'Archived',
      value: 'archived',
    },
  ],
  default: '',
  description: 'Filter by content status',
},
{
  displayName: 'Organization ID',
  name: 'organizationId',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['content'],
      operation: ['getContent', 'getContentItem', 'deleteContent'],
    },
  },
  default: '',
  description: 'The organization ID',
},
{
  displayName: 'Content ID',
  name: 'contentId',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['content'],
      operation: ['getContentItem', 'updateContent', 'deleteContent', 'publishContent'],
    },
  },
  default: '',
  description: 'The content ID',
},
{
  displayName: 'Name',
  name: 'name',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['content'],
      operation: ['createContent', 'updateContent'],
    },
  },
  default: '',
  description: 'The content name',
},
{
  displayName: 'Type',
  name: 'type',
  type: 'options',
  required: true,
  displayOptions: {
    show: {
      resource: ['content'],
      operation: ['createContent'],
    },
  },
  options: [
    {
      name: 'Walk-Thru',
      value: 'walkthru',
    },
    {
      name: 'SmartTip',
      value: 'smarttip',
    },
    {
      name: 'ShoutOut',
      value: 'shoutout',
    },
    {
      name: 'Launcher',
      value: 'launcher',
    },
  ],
  default: 'walkthru',
  description: 'The content type',
},
{
  displayName: 'Steps',
  name: 'steps',
  type: 'json',
  displayOptions: {
    show: {
      resource: ['content'],
      operation: ['createContent', 'updateContent'],
    },
  },
  default: '[]',
  description: 'Array of content steps configuration',
},
{
  displayName: 'Targeting',
  name: 'targeting',
  type: 'json',
  displayOptions: {
    show: {
      resource: ['content'],
      operation: ['createContent', 'updateContent'],
    },
  },
  default: '{}',
  description: 'Targeting configuration for the content',
},
{
  displayName: 'Environment',
  name: 'environment',
  type: 'options',
  required: true,
  displayOptions: {
    show: {
      resource: ['content'],
      operation: ['publishContent'],
    },
  },
  options: [
    {
      name: 'Development',
      value: 'dev',
    },
    {
      name: 'Staging',
      value: 'staging',
    },
    {
      name: 'Production',
      value: 'production',
    },
  ],
  default: 'dev',
  description: 'Environment to publish content to',
},
{
  displayName: 'Organization ID',
  name: 'organizationId',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['segments'],
      operation: ['getSegments', 'getSegment', 'createSegment', 'deleteSegment'],
    },
  },
  default: '',
  description: 'The organization identifier',
},
{
  displayName: 'Status',
  name: 'status',
  type: 'options',
  displayOptions: {
    show: {
      resource: ['segments'],
      operation: ['getSegments'],
    },
  },
  options: [
    {
      name: 'Active',
      value: 'active',
    },
    {
      name: 'Inactive',
      value: 'inactive',
    },
    {
      name: 'All',
      value: 'all',
    },
  ],
  default: 'all',
  description: 'Filter segments by status',
},
{
  displayName: 'Segment ID',
  name: 'segmentId',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['segments'],
      operation: ['getSegment', 'updateSegment', 'deleteSegment', 'getSegmentUsers'],
    },
  },
  default: '',
  description: 'The segment identifier',
},
{
  displayName: 'Name',
  name: 'name',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['segments'],
      operation: ['createSegment'],
    },
  },
  default: '',
  description: 'The name of the segment',
},
{
  displayName: 'Name',
  name: 'name',
  type: 'string',
  displayOptions: {
    show: {
      resource: ['segments'],
      operation: ['updateSegment'],
    },
  },
  default: '',
  description: 'The name of the segment',
},
{
  displayName: 'Conditions',
  name: 'conditions',
  type: 'json',
  required: true,
  displayOptions: {
    show: {
      resource: ['segments'],
      operation: ['createSegment'],
    },
  },
  default: '{}',
  description: 'JSON object defining the segment conditions and targeting rules',
},
{
  displayName: 'Conditions',
  name: 'conditions',
  type: 'json',
  displayOptions: {
    show: {
      resource: ['segments'],
      operation: ['updateSegment'],
    },
  },
  default: '{}',
  description: 'JSON object defining the segment conditions and targeting rules',
},
{
  displayName: 'Rules',
  name: 'rules',
  type: 'json',
  default: '{}',
  required: true,
  description: 'The targeting rules for the segment in JSON format',
  displayOptions: {
    show: {
      resource: ['segments'],
      operation: ['createSegment', 'updateSegment'],
    },
  },
},
{
  displayName: 'Description',
  name: 'description',
  type: 'string',
  default: '',
  description: 'Description of the segment',
  displayOptions: {
    show: {
      resource: ['segments'],
      operation: ['createSegment'],
    },
  },
},
{
  displayName: 'Page',
  name: 'page',
  type: 'number',
  displayOptions: {
    show: {
      resource: ['segments'],
      operation: ['getSegmentUsers'],
    },
  },
  default: 1,
  description: 'Page number for pagination',
},
{
  displayName: 'Limit',
  name: 'limit',
  type: 'number',
  displayOptions: {
    show: {
      resource: ['segments'],
      operation: ['getSegmentUsers'],
    },
  },
  default: 50,
  description: 'Number of users to return per page',
},
{
  displayName: 'Page',
  name: 'page',
  type: 'number',
  displayOptions: {
    show: {
      resource: ['organizations'],
      operation: ['getOrganizations'],
    },
  },
  default: 1,
  description: 'Page number for pagination',
},
{
  displayName: 'Limit',
  name: 'limit',
  type: 'number',
  displayOptions: {
    show: {
      resource: ['organizations'],
      operation: ['getOrganizations'],
    },
  },
  default: 50,
  description: 'Number of items per page',
},
{
  displayName: 'Organization ID',
  name: 'organizationId',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['organizations'],
      operation: ['getOrganization', 'updateOrganization', 'getEnvironments', 'createEnvironment', 'updateEnvironment'],
    },
  },
  default: '',
  description: 'The organization ID',
},
{
  displayName: 'Name',
  name: 'name',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['organizations'],
      operation: ['updateOrganization'],
    },
  },
  default: '',
  description: 'Organization name',
},
{
  displayName: 'Settings',
  name: 'settings',
  type: 'json',
  displayOptions: {
    show: {
      resource: ['organizations'],
      operation: ['updateOrganization'],
    },
  },
  default: '{}',
  description: 'Organization settings as JSON object',
},
{
  displayName: 'Environment Name',
  name: 'environmentName',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['organizations'],
      operation: ['createEnvironment'],
    },
  },
  default: '',
  description: 'Name of the environment to create',
},
{
  displayName: 'Domain',
  name: 'domain',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['organizations'],
      operation: ['createEnvironment'],
    },
  },
  default: '',
  description: 'Domain for the environment',
},
{
  displayName: 'Environment ID',
  name: 'envId',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['organizations'],
      operation: ['updateEnvironment'],
    },
  },
  default: '',
  description: 'The environment ID to update',
},
{
  displayName: 'Environment Settings',
  name: 'environmentSettings',
  type: 'json',
  displayOptions: {
    show: {
      resource: ['organizations'],
      operation: ['updateEnvironment'],
    },
  },
  default: '{}',
  description: 'Environment settings as JSON object',
},
{
	displayName: 'Status',
	name: 'status',
	type: 'options',
	displayOptions: { show: { resource: ['walkthroughs'], operation: ['getWalkthroughs'] } },
	options: [
		{ name: 'Active', value: 'active' },
		{ name: 'Draft', value: 'draft' },
		{ name: 'Published', value: 'published' },
	],
	default: '',
	description: 'Filter walkthroughs by status',
},
{
	displayName: 'Tag',
	name: 'tag',
	type: 'string',
	displayOptions: { show: { resource: ['walkthroughs'], operation: ['getWalkthroughs'] } },
	default: '',
	description: 'Filter walkthroughs by tag',
},
{
	displayName: 'Page',
	name: 'page',
	type: 'number',
	displayOptions: { show: { resource: ['walkthroughs'], operation: ['getWalkthroughs'] } },
	default: 1,
	description: 'Page number for pagination',
},
{
	displayName: 'Walkthrough ID',
	name: 'walkthroughId',
	type: 'string',
	required: true,
	displayOptions: { show: { resource: ['walkthroughs'], operation: ['getWalkthrough', 'updateWalkthrough', 'deleteWalkthrough', 'publishWalkthrough'] } },
	default: '',
	description: 'ID of the walkthrough',
},
{
	displayName: 'Name',
	name: 'name',
	type: 'string',
	required: true,
	displayOptions: { show: { resource: ['walkthroughs'], operation: ['createWalkthrough', 'updateWalkthrough'] } },
	default: '',
	description: 'Name of the walkthrough',
},
{
	displayName: 'Steps',
	name: 'steps',
	type: 'json',
	required: true,
	displayOptions: { show: { resource: ['walkthroughs'], operation: ['createWalkthrough', 'updateWalkthrough'] } },
	default: '[]',
	description: 'Steps of the walkthrough in JSON format',
},
{
	displayName: 'Target URL',
	name: 'targetUrl',
	type: 'string',
	required: true,
	displayOptions: { show: { resource: ['walkthroughs'], operation: ['createWalkthrough'] } },
	default: '',
	description: 'Target URL where the walkthrough will be displayed',
},
{
	displayName: 'Is Enabled',
	name: 'isEnabled',
	type: 'boolean',
	displayOptions: { show: { resource: ['walkthroughs'], operation: ['createWalkthrough', 'updateWalkthrough'] } },
	default: true,
	description: 'Whether the walkthrough is enabled',
},
{
  displayName: 'Status',
  name: 'status',
  type: 'options',
  options: [
    { name: 'Active', value: 'active' },
    { name: 'Inactive', value: 'inactive' },
    { name: 'Draft', value: 'draft' },
  ],
  displayOptions: { show: { resource: ['smartTips'], operation: ['getSmartTips'] } },
  default: 'active',
  description: 'Filter smart tips by status',
},
{
  displayName: 'Category',
  name: 'category',
  type: 'string',
  displayOptions: { show: { resource: ['smartTips'], operation: ['getSmartTips'] } },
  default: '',
  description: 'Filter smart tips by category',
},
{
  displayName: 'Page',
  name: 'page',
  type: 'number',
  displayOptions: { show: { resource: ['smartTips'], operation: ['getSmartTips'] } },
  default: 1,
  description: 'Page number for pagination',
},
{
  displayName: 'Tip ID',
  name: 'tipId',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['smartTips'], operation: ['getSmartTip', 'updateSmartTip', 'deleteSmartTip', 'getSmartTipAnalytics'] } },
  default: '',
  description: 'ID of the smart tip',
},
{
  displayName: 'Title',
  name: 'title',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['smartTips'], operation: ['createSmartTip', 'updateSmartTip'] } },
  default: '',
  description: 'Title of the smart tip',
},
{
  displayName: 'Content',
  name: 'content',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['smartTips'], operation: ['createSmartTip', 'updateSmartTip'] } },
  default: '',
  description: 'Content of the smart tip',
},
{
  displayName: 'Trigger',
  name: 'trigger',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['smartTips'], operation: ['createSmartTip'] } },
  default: '',
  description: 'Trigger condition for the smart tip',
},
{
  displayName: 'Target Element',
  name: 'targetElement',
  type: 'string',
  required: true,
  displayOptions: { show: { resource: ['smartTips'], operation: ['createSmartTip'] } },
  default: '',
  description: 'CSS selector for the target element',
},
{
  displayName: 'Is Enabled',
  name: 'isEnabled',
  type: 'boolean',
  displayOptions: { show: { resource: ['smartTips'], operation: ['updateSmartTip'] } },
  default: true,
  description: 'Whether the smart tip is enabled',
},
{
  displayName: 'Start Date',
  name: 'startDate',
  type: 'dateTime',
  displayOptions: { show: { resource: ['smartTips'], operation: ['getSmartTipAnalytics'] } },
  default: '',
  description: 'Start date for analytics data (ISO 8601 format)',
},
{
  displayName: 'End Date',
  name: 'endDate',
  type: 'dateTime',
  displayOptions: { show: { resource: ['smartTips'], operation: ['getSmartTipAnalytics'] } },
  default: '',
  description: 'End date for analytics data (ISO 8601 format)',
},
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const resource = this.getNodeParameter('resource', 0) as string;

    switch (resource) {
      case 'users':
        return [await executeUsersOperations.call(this, items)];
      case 'analytics':
        return [await executeAnalyticsOperations.call(this, items)];
      case 'content':
        return [await executeContentOperations.call(this, items)];
      case 'segments':
        return [await executeSegmentsOperations.call(this, items)];
      case 'organizations':
        return [await executeOrganizationsOperations.call(this, items)];
      case 'walkthroughs':
        return [await executeWalkthroughsOperations.call(this, items)];
      case 'smartTips':
        return [await executeSmartTipsOperations.call(this, items)];
      default:
        throw new NodeOperationError(this.getNode(), `The resource "${resource}" is not supported`);
    }
  }
}

// ============================================================
// Resource Handler Functions
// ============================================================

async function executeUsersOperations(
  this: IExecuteFunctions,
  items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];
  const operation = this.getNodeParameter('operation', 0) as string;
  const credentials = await this.getCredentials('walkmeApi') as any;

  for (let i = 0; i < items.length; i++) {
    try {
      let result: any;
      
      switch (operation) {
        case 'getUsers': {
          const organizationId = this.getNodeParameter('organizationId', i) as string;
          const page = this.getNodeParameter('page', i, 1) as number;
          const limit = this.getNodeParameter('limit', i, 50) as number;
          const filter = this.getNodeParameter('filter', i) as string;
          
          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/users`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            qs: {
              page,
              limit,
              organizationId,
              ...(filter && { filter }),
            },
            json: true,
          };
          
          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        
        case 'getUser': {
          const userId = this.getNodeParameter('userId', i) as string;
          const organizationId = this.getNodeParameter('organizationId', i) as string;
          
          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/users/${userId}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            qs: {
              organizationId,
            },
            json: true,
          };
          
          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        
        case 'createUser': {
          const email = this.getNodeParameter('email', i) as string;
          const name = this.getNodeParameter('name', i) as string;
          const organizationId = this.getNodeParameter('organizationId', i) as string;
          const role = this.getNodeParameter('role', i) as string;
          const department = this.getNodeParameter('department', i) as string;
          const properties = this.getNodeParameter('properties', i, {}) as any;
          
          const body: any = {
            email,
            name,
            organizationId,
          };
          
          if (role) body.role = role;
          if (department) body.department = department;
          
          if (properties && properties.property && properties.property.length > 0) {
            const propertiesObj: any = {};
            properties.property.forEach((prop: any) => {
              if (prop.key && prop.value) {
                propertiesObj[prop.key] = prop.value;
              }
            });
            if (Object.keys(propertiesObj).length > 0) {
              body.properties = propertiesObj;
            }
          }
          
          const options: any = {
            method: 'POST',
            url: `${credentials.baseUrl}/users`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            body,
            json: true,
          };
          
          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        
        case 'updateUser': {
          const userId = this.getNodeParameter('userId', i) as string;
          const email = this.getNodeParameter('email', i, '') as string;
          const name = this.getNodeParameter('name', i, '') as string;
          const role = this.getNodeParameter('role', i, '') as string;
          const department = this.getNodeParameter('department', i, '') as string;
          const properties = this.getNodeParameter('properties', i, {}) as any;
          
          const body: any = {};
          
          if (email) body.email = email;
          if (name) body.name = name;
          if (role) body.role = role;
          if (department) body.department = department;
          
          if (properties && properties.property && properties.property.length > 0) {
            const propertiesObj: any = {};
            properties.property.forEach((prop: any) => {
              if (prop.key && prop.value) {
                propertiesObj[prop.key] = prop.value;
              }
            });
            if (Object.keys(propertiesObj).length > 0) {
              body.properties = propertiesObj;
            }
          }
          
          const options: any = {
            method: 'PUT',
            url: `${credentials.baseUrl}/users/${userId}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            body,
            json: true,
          };
          
          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        
        case 'deleteUser': {
          const userId = this.getNodeParameter('userId', i) as string;
          const organizationId = this.getNodeParameter('organizationId', i) as string;
          
          const options: any = {
            method: 'DELETE',
            url: `${credentials.baseUrl}/users/${userId}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            qs: {
              organizationId,
            },
            json: true,
          };
          
          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        
        case 'bulkCreateUsers': {
          const users = this.getNodeParameter('users', i) as string;
          const organizationId = this.getNodeParameter('organizationId', i) as string;
          
          let usersArray: any;
          try {
            usersArray = JSON.parse(users);
          } catch (error: any) {
            throw new NodeOperationError(this.getNode(), `Invalid JSON in users parameter: ${error.message}`);
          }
          
          if (!Array.isArray(usersArray)) {
            throw new NodeOperationError(this.getNode(), 'Users parameter must be an array');
          }
          
          const body: any = {
            users: usersArray,
            organizationId,
          };
          
          const options: any = {
            method: 'POST',
            url: `${credentials.baseUrl}/users/bulk`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            body,
            json: true,
          };
          
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getUserActivity': {
          const userId = this.getNodeParameter('userId', i) as string;
          const startDate = this.getNodeParameter('startDate', i) as string;
          const endDate = this.getNodeParameter('endDate', i) as string;

          const queryParams = new URLSearchParams();
          if (startDate) {
            queryParams.append('startDate', startDate);
          }
          if (endDate) {
            queryParams.append('endDate', endDate);
          }

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/users/${userId}/activity${queryParams.toString() ? '?' + queryParams.toString() : ''}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }
        
        default:
          throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
      }
      
      returnData.push({ json: result, pairedItem: { item: i } });
    } catch (error: any) {
      if (this.continueOnFail()) {
        returnData.push({
          json: { error: error.message },
          pairedItem: { item: i },
        });
      } else {
        if (error.statusCode) {
          throw new NodeApiError(this.getNode(), error);
        }
        throw new NodeOperationError(this.getNode(), error.message);
      }
    }
  }
  
  return returnData;
}

async function executeAnalyticsOperations(
  this: IExecuteFunctions,
  items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];
  const operation = this.getNodeParameter('operation', 0) as string;
  const credentials = await this.getCredentials('walkmeApi') as any;

  for (let i = 0; i < items.length; i++) {
    try {
      let result: any;
      
      switch (operation) {
        case 'getEvents': {
          const startDate = this.getNodeParameter('startDate', i) as string;
          const endDate = this.getNodeParameter('endDate', i) as string;
          const eventType = this.getNodeParameter('eventType', i) as string;
          const userId = this.getNodeParameter('userId', i) as string;
          
          const queryParams = new URLSearchParams({
            startDate,
            endDate,
            ...(eventType && { eventType }),
            ...(userId && { userId }),
          });

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/analytics/events?${queryParams.toString()}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };
          
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getSessions': {
          const startDate = this.getNodeParameter('startDate', i) as string;
          const endDate = this.getNodeParameter('endDate', i) as string;
          const userId = this.getNodeParameter('userId', i) as string;
          const organizationId = this.getNodeParameter('organizationId', i) as string;
          
          const queryParams = new URLSearchParams({
            startDate,
            endDate,
            ...(userId && { userId }),
            ...(organizationId && { organizationId }),
          });

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/analytics/sessions?${queryParams.toString()}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };
          
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getContentAnalytics': {
          const contentId = this.getNodeParameter('contentId', i) as string;
          const startDate = this.getNodeParameter('startDate', i) as string;
          const endDate = this.getNodeParameter('endDate', i) as string;
          
          const queryParams = new URLSearchParams({
            contentId,
            startDate,
            endDate,
          });

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/analytics/content?${queryParams.toString()}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };
          
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'createEvent': {
          const eventType = this.getNodeParameter('eventType', i) as string;
          const userId = this.getNodeParameter('userId', i) as string;
          const propertiesString = this.getNodeParameter('properties', i) as string;
          const timestamp = this.getNodeParameter('timestamp', i) as string;
          
          let properties: any = {};
          try {
            if (propertiesString) {
              properties = JSON.parse(propertiesString);
            }
          } catch (error: any) {
            throw new NodeOperationError(this.getNode(), `Invalid JSON in properties: ${error.message}`);
          }

          const body: any = {
            eventType,
            userId,
            properties,
            ...(timestamp && { timestamp }),
          };

          const options: any = {
            method: 'POST',
            url: `${credentials.baseUrl}/analytics/events`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            body,
            json: true,
          };
          
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getReports': {
          const reportType = this.getNodeParameter('reportType', i) as string;
          const startDate = this.getNodeParameter('startDate', i) as string;
          const endDate = this.getNodeParameter('endDate', i) as string;
          const filtersString = this.getNodeParameter('filters', i) as string;
          
          let filters: any = {};
          try {
            if (filtersString) {
              filters = JSON.parse(filtersString);
            }
          } catch (error: any) {
            throw new NodeOperationError(this.getNode(), `Invalid JSON in filters: ${error.message}`);
          }

          const queryParams = new URLSearchParams({
            reportType,
            startDate,
            endDate,
            ...(Object.keys(filters).length > 0 && { filters: JSON.stringify(filters) }),
          });

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/analytics/reports?${queryParams.toString()}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };
          
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getFunnels': {
          const funnelId = this.getNodeParameter('funnelId', i) as string;
          const startDate = this.getNodeParameter('startDate', i) as string;
          const endDate = this.getNodeParameter('endDate', i) as string;
          
          const queryParams = new URLSearchParams({
            funnelId,
            startDate,
            endDate,
          });

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/analytics/funnels?${queryParams.toString()}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };
          
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getInsights': {
          const startDate = this.getNodeParameter('startDate', i) as string;
          const endDate = this.getNodeParameter('endDate', i) as string;
          const metric = this.getNodeParameter('metric', i) as string;

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/analytics/insights`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            qs: {
              startDate: new Date(startDate).toISOString(),
              endDate: new Date(endDate).toISOString(),
              metric,
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getEngagement': {
          const startDate = this.getNodeParameter('startDate', i) as string;
          const endDate = this.getNodeParameter('endDate', i) as string;
          const segmentId = this.getNodeParameter('segmentId', i) as string;

          const qs: any = {
            startDate: new Date(startDate).toISOString(),
            endDate: new Date(endDate).toISOString(),
          };

          if (segmentId) {
            qs.segmentId = segmentId;
          }

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/analytics/engagement`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            qs,
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getGoals': {
          const startDate = this.getNodeParameter('startDate', i) as string;
          const endDate = this.getNodeParameter('endDate', i) as string;
          const goalId = this.getNodeParameter('goalId', i) as string;

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/analytics/goals`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            qs: {
              goalId,
              startDate: new Date(startDate).toISOString(),
              endDate: new Date(endDate).toISOString(),
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'get