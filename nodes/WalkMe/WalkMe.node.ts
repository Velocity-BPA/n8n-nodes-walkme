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
  displayName: 'User ID',
  name: 'userId',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['users'],
      operation: ['getUser', 'updateUser', 'deleteUser'],
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
  required: true,
  displayOptions: {
    show: {
      resource: ['analytics'],
      operation: ['getEvents', 'getSessions', 'getContentAnalytics', 'getReports', 'getFunnels'],
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
      operation: ['getEvents', 'getSessions', 'getContentAnalytics', 'getReports', 'getFunnels'],
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
      operation: ['createEvent'],
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
      operation: ['createEvent'],
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
          const properties = this.getNodeParameter('properties', i, {}) as any;
          
          const body: any = {
            email,
            name,
            organizationId,
          };
          
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
          const properties = this.getNodeParameter('properties', i, {}) as any;
          
          const body: any = {};
          
          if (email) body.email = email;
          if (name) body.name = name;
          
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

        default:
          throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
      }

      returnData.push({ json: result, pairedItem: { item: i } });
      
    } catch (error: any) {
      if (this.continueOnFail()) {
        returnData.push({ 
          json: { error: error.message }, 
          pairedItem: { item: i } 
        });
      } else {
        if (error.response && error.response.body) {
          throw new NodeApiError(this.getNode(), error.response.body);
        } else {
          throw new NodeOperationError(this.getNode(), error.message);
        }
      }
    }
  }

  return returnData;
}

async function executeContentOperations(
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
        case 'getContent': {
          const organizationId = this.getNodeParameter('organizationId', i) as string;
          const contentType = this.getNodeParameter('contentType', i) as string;
          const status = this.getNodeParameter('status', i) as string;

          const params: any = {
            organizationId,
          };
          if (contentType) {
            params.contentType = contentType;
          }
          if (status) {
            params.status = status;
          }

          const queryString = new URLSearchParams(params).toString();
          const options: any = {
            method: 'GET',
            url: `https://api.walkme.com/v2/content?${queryString}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getContentItem': {
          const contentId = this.getNodeParameter('contentId', i) as string;
          const organizationId = this.getNodeParameter('organizationId', i) as string;

          const options: any = {
            method: 'GET',
            url: `https://api.walkme.com/v2/content/${contentId}?organizationId=${organizationId}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'createContent': {
          const name = this.getNodeParameter('name', i) as string;
          const type = this.getNodeParameter('type', i) as string;
          const stepsParam = this.getNodeParameter('steps', i) as string;
          const targetingParam = this.getNodeParameter('targeting', i) as string;

          let steps: any = [];
          let targeting: any = {};

          try {
            if (stepsParam) {
              steps = JSON.parse(stepsParam);
            }
          } catch (error: any) {
            throw new NodeOperationError(this.getNode(), `Invalid JSON in steps parameter: ${error.message}`);
          }

          try {
            if (targetingParam) {
              targeting = JSON.parse(targetingParam);
            }
          } catch (error: any) {
            throw new NodeOperationError(this.getNode(), `Invalid JSON in targeting parameter: ${error.message}`);
          }

          const body: any = {
            name,
            type,
            steps,
            targeting,
          };

          const options: any = {
            method: 'POST',
            url: 'https://api.walkme.com/v2/content',
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: true,
            body,
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'updateContent': {
          const contentId = this.getNodeParameter('contentId', i) as string;
          const name = this.getNodeParameter('name', i) as string;
          const stepsParam = this.getNodeParameter('steps', i) as string;
          const targetingParam = this.getNodeParameter('targeting', i) as string;

          let steps: any = [];
          let targeting: any = {};

          try {
            if (stepsParam) {
              steps = JSON.parse(stepsParam);
            }
          } catch (error: any) {
            throw new NodeOperationError(this.getNode(), `Invalid JSON in steps parameter: ${error.message}`);
          }

          try {
            if (targetingParam) {
              targeting = JSON.parse(targetingParam);
            }
          } catch (error: any) {
            throw new NodeOperationError(this.getNode(), `Invalid JSON in targeting parameter: ${error.message}`);
          }

          const body: any = {
            name,
            steps,
            targeting,
          };

          const options: any = {
            method: 'PUT',
            url: `https://api.walkme.com/v2/content/${contentId}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: true,
            body,
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'deleteContent': {
          const contentId = this.getNodeParameter('contentId', i) as string;
          const organizationId = this.getNodeParameter('organizationId', i) as string;

          const options: any = {
            method: 'DELETE',
            url: `https://api.walkme.com/v2/content/${contentId}?organizationId=${organizationId}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'publishContent': {
          const contentId = this.getNodeParameter('contentId', i) as string;
          const environment = this.getNodeParameter('environment', i) as string;

          const body: any = {
            environment,
          };

          const options: any = {
            method: 'POST',
            url: `https://api.walkme.com/v2/content/${contentId}/publish`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: true,
            body,
          };
          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        default:
          throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
      }

      returnData.push({
        json: result,
        pairedItem: { item: i },
      });

    } catch (error: any) {
      if (this.continueOnFail()) {
        returnData.push({
          json: { error: error.message },
          pairedItem: { item: i },
        });
      } else {
        if (error.response && error.response.body) {
          throw new NodeApiError(this.getNode(), error.response.body, { httpCode: error.response.statusCode });
        } else {
          throw new NodeOperationError(this.getNode(), error.message);
        }
      }
    }
  }

  return returnData;
}

async function executeSegmentsOperations(
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
        case 'getSegments': {
          const organizationId = this.getNodeParameter('organizationId', i) as string;
          const status = this.getNodeParameter('status', i) as string;

          const queryParams: any = {
            organizationId,
          };

          if (status !== 'all') {
            queryParams.status = status;
          }

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/segments`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            qs: queryParams,
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getSegment': {
          const segmentId = this.getNodeParameter('segmentId', i) as string;
          const organizationId = this.getNodeParameter('organizationId', i) as string;

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/segments/${segmentId}`,
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

        case 'createSegment': {
          const name = this.getNodeParameter('name', i) as string;
          const conditions = this.getNodeParameter('conditions', i) as string;
          const organizationId = this.getNodeParameter('organizationId', i) as string;

          let parsedConditions: any;
          try {
            parsedConditions = JSON.parse(conditions);
          } catch (error: any) {
            throw new NodeOperationError(
              this.getNode(),
              `Invalid JSON in conditions parameter: ${error.message}`,
              { itemIndex: i }
            );
          }

          const options: any = {
            method: 'POST',
            url: `${credentials.baseUrl}/segments`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            body: {
              name,
              conditions: parsedConditions,
              organizationId,
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'updateSegment': {
          const segmentId = this.getNodeParameter('segmentId', i) as string;
          const name = this.getNodeParameter('name', i) as string;
          const conditions = this.getNodeParameter('conditions', i) as string;

          const body: any = {};

          if (name) {
            body.name = name;
          }

          if (conditions) {
            try {
              body.conditions = JSON.parse(conditions);
            } catch (error: any) {
              throw new NodeOperationError(
                this.getNode(),
                `Invalid JSON in conditions parameter: ${error.message}`,
                { itemIndex: i }
              );
            }
          }

          const options: any = {
            method: 'PUT',
            url: `${credentials.baseUrl}/segments/${segmentId}`,
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

        case 'deleteSegment': {
          const segmentId = this.getNodeParameter('segmentId', i) as string;
          const organizationId = this.getNodeParameter('organizationId', i) as string;

          const options: any = {
            method: 'DELETE',
            url: `${credentials.baseUrl}/segments/${segmentId}`,
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

        case 'getSegmentUsers': {
          const segmentId = this.getNodeParameter('segmentId', i) as string;
          const page = this.getNodeParameter('page', i) as number;
          const limit = this.getNodeParameter('limit', i) as number;

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/segments/${segmentId}/users`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            qs: {
              page,
              limit,
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        default:
          throw new NodeOperationError(
            this.getNode(),
            `Unknown operation: ${operation}`,
            { itemIndex: i }
          );
      }

      returnData.push({
        json: result,
        pairedItem: { item: i },
      });

    } catch (error: any) {
      if (this.continueOnFail()) {
        returnData.push({
          json: { error: error.message },
          pairedItem: { item: i },
        });
      } else {
        throw new NodeApiError(this.getNode(), error, { itemIndex: i });
      }
    }
  }

  return returnData;
}

async function executeOrganizationsOperations(
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
        case 'getOrganizations': {
          const page = this.getNodeParameter('page', i) as number;
          const limit = this.getNodeParameter('limit', i) as number;

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/organizations`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            qs: {
              page,
              limit,
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getOrganization': {
          const organizationId = this.getNodeParameter('organizationId', i) as string;

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/organizations/${organizationId}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'updateOrganization': {
          const organizationId = this.getNodeParameter('organizationId', i) as string;
          const name = this.getNodeParameter('name', i) as string;
          const settings = this.getNodeParameter('settings', i) as string;

          let parsedSettings: any;
          try {
            parsedSettings = JSON.parse(settings);
          } catch (error: any) {
            throw new NodeOperationError(this.getNode(), 'Invalid JSON in settings parameter', {
              itemIndex: i,
            });
          }

          const options: any = {
            method: 'PUT',
            url: `${credentials.baseUrl}/organizations/${organizationId}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            body: {
              name,
              settings: parsedSettings,
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getEnvironments': {
          const organizationId = this.getNodeParameter('organizationId', i) as string;

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/organizations/${organizationId}/environments`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'createEnvironment': {
          const organizationId = this.getNodeParameter('organizationId', i) as string;
          const environmentName = this.getNodeParameter('environmentName', i) as string;
          const domain = this.getNodeParameter('domain', i) as string;

          const options: any = {
            method: 'POST',
            url: `${credentials.baseUrl}/organizations/${organizationId}/environments`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            body: {
              name: environmentName,
              domain,
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'updateEnvironment': {
          const organizationId = this.getNodeParameter('organizationId', i) as string;
          const envId = this.getNodeParameter('envId', i) as string;
          const environmentSettings = this.getNodeParameter('environmentSettings', i) as string;

          let parsedSettings: any;
          try {
            parsedSettings = JSON.parse(environmentSettings);
          } catch (error: any) {
            throw new NodeOperationError(this.getNode(), 'Invalid JSON in environment settings parameter', {
              itemIndex: i,
            });
          }

          const options: any = {
            method: 'PUT',
            url: `${credentials.baseUrl}/organizations/${organizationId}/environments/${envId}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            body: {
              settings: parsedSettings,
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        default:
          throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`, {
            itemIndex: i,
          });
      }

      returnData.push({
        json: result,
        pairedItem: { item: i },
      });

    } catch (error: any) {
      if (this.continueOnFail()) {
        returnData.push({
          json: { error: error.message },
          pairedItem: { item: i },
        });
      } else {
        if (error.httpCode) {
          throw new NodeApiError(this.getNode(), error, { itemIndex: i });
        } else {
          throw new NodeOperationError(this.getNode(), error.message, { itemIndex: i });
        }
      }
    }
  }

  return returnData;
}
