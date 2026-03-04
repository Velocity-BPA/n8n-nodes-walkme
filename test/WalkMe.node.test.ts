/**
 * Copyright (c) 2026 Velocity BPA
 * Licensed under the Business Source License 1.1
 */

import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { WalkMe } from '../nodes/WalkMe/WalkMe.node';

// Mock n8n-workflow
jest.mock('n8n-workflow', () => ({
  ...jest.requireActual('n8n-workflow'),
  NodeApiError: class NodeApiError extends Error {
    constructor(node: any, error: any) { super(error.message || 'API Error'); }
  },
  NodeOperationError: class NodeOperationError extends Error {
    constructor(node: any, message: string) { super(message); }
  },
}));

describe('WalkMe Node', () => {
  let node: WalkMe;

  beforeAll(() => {
    node = new WalkMe();
  });

  describe('Node Definition', () => {
    it('should have correct basic properties', () => {
      expect(node.description.displayName).toBe('WalkMe');
      expect(node.description.name).toBe('walkme');
      expect(node.description.version).toBe(1);
      expect(node.description.inputs).toContain('main');
      expect(node.description.outputs).toContain('main');
    });

    it('should define 5 resources', () => {
      const resourceProp = node.description.properties.find(
        (p: any) => p.name === 'resource'
      );
      expect(resourceProp).toBeDefined();
      expect(resourceProp!.type).toBe('options');
      expect(resourceProp!.options).toHaveLength(5);
    });

    it('should have operation dropdowns for each resource', () => {
      const operations = node.description.properties.filter(
        (p: any) => p.name === 'operation'
      );
      expect(operations.length).toBe(5);
    });

    it('should require credentials', () => {
      expect(node.description.credentials).toBeDefined();
      expect(node.description.credentials!.length).toBeGreaterThan(0);
      expect(node.description.credentials![0].required).toBe(true);
    });

    it('should have parameters with proper displayOptions', () => {
      const params = node.description.properties.filter(
        (p: any) => p.displayOptions?.show?.resource
      );
      for (const param of params) {
        expect(param.displayOptions.show.resource).toBeDefined();
        expect(Array.isArray(param.displayOptions.show.resource)).toBe(true);
      }
    });
  });

  // Resource-specific tests
describe('Users Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({
        apiKey: 'test-api-key',
        baseUrl: 'https://api.walkme.com/v2',
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: {
        httpRequest: jest.fn(),
        requestWithAuthentication: jest.fn(),
      },
    };
  });

  describe('getUsers operation', () => {
    it('should retrieve users successfully', async () => {
      const mockResponse = {
        users: [
          { id: '1', email: 'user1@example.com', name: 'User 1' },
          { id: '2', email: 'user2@example.com', name: 'User 2' },
        ],
        total: 2,
        page: 1,
      };

      mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
        switch (param) {
          case 'operation': return 'getUsers';
          case 'organizationId': return 'org-123';
          case 'page': return 1;
          case 'limit': return 50;
          default: return undefined;
        }
      });

      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const result = await executeUsersOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toHaveLength(1);
      expect(result[0].json).toEqual(mockResponse);
      expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
        method: 'GET',
        url: 'https://api.walkme.com/v2/users',
        headers: {
          'Authorization': 'Bearer test-api-key',
          'Content-Type': 'application/json',
        },
        qs: {
          page: 1,
          limit: 50,
          organizationId: 'org-123',
        },
        json: true,
      });
    });
  });

  describe('getUser operation', () => {
    it('should retrieve a specific user successfully', async () => {
      const mockResponse = {
        id: '1',
        email: 'user1@example.com',
        name: 'User 1',
        properties: {},
      };

      mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
        switch (param) {
          case 'operation': return 'getUser';
          case 'userId': return 'user-123';
          case 'organizationId': return 'org-123';
          default: return undefined;
        }
      });

      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const result = await executeUsersOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toHaveLength(1);
      expect(result[0].json).toEqual(mockResponse);
    });
  });

  describe('createUser operation', () => {
    it('should create a user successfully', async () => {
      const mockResponse = {
        id: 'new-user-123',
        email: 'newuser@example.com',
        name: 'New User',
        organizationId: 'org-123',
      };

      mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
        switch (param) {
          case 'operation': return 'createUser';
          case 'email': return 'newuser@example.com';
          case 'name': return 'New User';
          case 'organizationId': return 'org-123';
          case 'properties': return {};
          default: return undefined;
        }
      });

      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const result = await executeUsersOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toHaveLength(1);
      expect(result[0].json).toEqual(mockResponse);
    });
  });

  describe('updateUser operation', () => {
    it('should update a user successfully', async () => {
      const mockResponse = {
        id: 'user-123',
        email: 'updated@example.com',
        name: 'Updated User',
      };

      mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
        switch (param) {
          case 'operation': return 'updateUser';
          case 'userId': return 'user-123';
          case 'email': return 'updated@example.com';
          case 'name': return 'Updated User';
          case 'properties': return {};
          default: return undefined;
        }
      });

      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const result = await executeUsersOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toHaveLength(1);
      expect(result[0].json).toEqual(mockResponse);
    });
  });

  describe('deleteUser operation', () => {
    it('should delete a user successfully', async () => {
      const mockResponse = { success: true };

      mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
        switch (param) {
          case 'operation': return 'deleteUser';
          case 'userId': return 'user-123';
          case 'organizationId': return 'org-123';
          default: return undefined;
        }
      });

      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const result = await executeUsersOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toHaveLength(1);
      expect(result[0].json).toEqual(mockResponse);
    });
  });

  describe('bulkCreateUsers operation', () => {
    it('should bulk create users successfully', async () => {
      const mockResponse = {
        created: 2,
        failed: 0,
        users: [
          { id: 'user-1', email: 'user1@example.com' },
          { id: 'user-2', email: 'user2@example.com' },
        ],
      };

      const usersJson = JSON.stringify([
        { email: 'user1@example.com', name: 'User 1' },
        { email: 'user2@example.com', name: 'User 2' },
      ]);

      mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
        switch (param) {
          case 'operation': return 'bulkCreateUsers';
          case 'users': return usersJson;
          case 'organizationId': return 'org-123';
          default: return undefined;
        }
      });

      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const result = await executeUsersOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toHaveLength(1);
      expect(result[0].json).toEqual(mockResponse);
    });

    it('should handle invalid JSON in bulk create', async () => {
      mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
        switch (param) {
          case 'operation': return 'bulkCreateUsers';
          case 'users': return 'invalid json';
          case 'organizationId': return 'org-123';
          default: return undefined;
        }
      });

      await expect(
        executeUsersOperations.call(mockExecuteFunctions, [{ json: {} }])
      ).rejects.toThrow('Invalid JSON in users parameter');
    });
  });

  describe('error handling', () => {
    it('should handle API errors', async () => {
      const apiError = new Error('API Error');
      (apiError as any).statusCode = 400;

      mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
        switch (param) {
          case 'operation': return 'getUsers';
          case 'organizationId': return 'org-123';
          default: return undefined;
        }
      });

      mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(apiError);

      await expect(
        executeUsersOperations.call(mockExecuteFunctions, [{ json: {} }])
      ).rejects.toThrow('API Error');
    });

    it('should continue on fail when enabled', async () => {
      mockExecuteFunctions.continueOnFail.mockReturnValue(true);
      mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
        switch (param) {
          case 'operation': return 'getUsers';
          case 'organizationId': return 'org-123';
          default: return undefined;
        }
      });

      mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));

      const result = await executeUsersOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toHaveLength(1);
      expect(result[0].json.error).toBe('API Error');
    });
  });
});

describe('Analytics Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({
        apiKey: 'test-api-key',
        baseUrl: 'https://api.walkme.com/v2',
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: {
        httpRequest: jest.fn(),
        requestWithAuthentication: jest.fn(),
      },
    };
  });

  it('should get events successfully', async () => {
    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
      const params: any = {
        'operation': 'getEvents',
        'startDate': '2023-01-01T00:00:00Z',
        'endDate': '2023-01-31T23:59:59Z',
        'eventType': 'click',
        'userId': 'user123',
      };
      return params[param];
    });

    const mockResponse = {
      events: [
        { id: '1', type: 'click', userId: 'user123', timestamp: '2023-01-15T10:00:00Z' },
      ],
      total: 1,
    };

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const items = [{ json: {} }];
    const result = await executeAnalyticsOperations.call(mockExecuteFunctions, items);

    expect(result).toHaveLength(1);
    expect(result[0].json).toEqual(mockResponse);
    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'GET',
      url: 'https://api.walkme.com/v2/analytics/events?startDate=2023-01-01T00%3A00%3A00Z&endDate=2023-01-31T23%3A59%3A59Z&eventType=click&userId=user123',
      headers: {
        'Authorization': 'Bearer test-api-key',
        'Content-Type': 'application/json',
      },
      json: true,
    });
  });

  it('should create event successfully', async () => {
    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
      const params: any = {
        'operation': 'createEvent',
        'eventType': 'custom_click',
        'userId': 'user456',
        'properties': '{"page": "homepage", "element": "button"}',
        'timestamp': '2023-01-15T10:00:00Z',
      };
      return params[param];
    });

    const mockResponse = {
      id: 'event123',
      status: 'created',
    };

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const items = [{ json: {} }];
    const result = await executeAnalyticsOperations.call(mockExecuteFunctions, items);

    expect(result).toHaveLength(1);
    expect(result[0].json).toEqual(mockResponse);
    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'POST',
      url: 'https://api.walkme.com/v2/analytics/events',
      headers: {
        'Authorization': 'Bearer test-api-key',
        'Content-Type': 'application/json',
      },
      body: {
        eventType: 'custom_click',
        userId: 'user456',
        properties: { page: 'homepage', element: 'button' },
        timestamp: '2023-01-15T10:00:00Z',
      },
      json: true,
    });
  });

  it('should handle invalid JSON in properties', async () => {
    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
      const params: any = {
        'operation': 'createEvent',
        'eventType': 'custom_click',
        'userId': 'user456',
        'properties': 'invalid json',
        'timestamp': '',
      };
      return params[param];
    });

    const items = [{ json: {} }];

    await expect(
      executeAnalyticsOperations.call(mockExecuteFunctions, items)
    ).rejects.toThrow();
  });

  it('should get content analytics successfully', async () => {
    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
      const params: any = {
        'operation': 'getContentAnalytics',
        'contentId': 'content123',
        'startDate': '2023-01-01T00:00:00Z',
        'endDate': '2023-01-31T23:59:59Z',
      };
      return params[param];
    });

    const mockResponse = {
      contentId: 'content123',
      views: 150,
      interactions: 45,
      completionRate: 0.75,
    };

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const items = [{ json: {} }];
    const result = await executeAnalyticsOperations.call(mockExecuteFunctions, items);

    expect(result).toHaveLength(1);
    expect(result[0].json).toEqual(mockResponse);
  });

  it('should handle API errors', async () => {
    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
      const params: any = {
        'operation': 'getEvents',
        'startDate': '2023-01-01T00:00:00Z',
        'endDate': '2023-01-31T23:59:59Z',
        'eventType': '',
        'userId': '',
      };
      return params[param];
    });

    const error = new Error('API Error');
    error.response = { body: { message: 'Unauthorized' } };
    mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(error);

    const items = [{ json: {} }];

    await expect(
      executeAnalyticsOperations.call(mockExecuteFunctions, items)
    ).rejects.toThrow();
  });

  it('should continue on fail when configured', async () => {
    mockExecuteFunctions.continueOnFail.mockReturnValue(true);
    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
      const params: any = {
        'operation': 'getEvents',
        'startDate': '2023-01-01T00:00:00Z',
        'endDate': '2023-01-31T23:59:59Z',
        'eventType': '',
        'userId': '',
      };
      return params[param];
    });

    mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));

    const items = [{ json: {} }];
    const result = await executeAnalyticsOperations.call(mockExecuteFunctions, items);

    expect(result).toHaveLength(1);
    expect(result[0].json).toEqual({ error: 'API Error' });
  });
});

describe('Content Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({
        apiKey: 'test-api-key',
        baseUrl: 'https://api.walkme.com/v2',
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: {
        httpRequest: jest.fn(),
        requestWithAuthentication: jest.fn(),
      },
    };
  });

  test('should get content list successfully', async () => {
    const mockResponse = {
      data: [
        { id: '1', name: 'Test Content', type: 'walkthru', status: 'published' },
        { id: '2', name: 'Test Content 2', type: 'smarttip', status: 'draft' },
      ],
    };

    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
      switch (param) {
        case 'operation': return 'getContent';
        case 'organizationId': return 'org123';
        case 'contentType': return 'walkthru';
        case 'status': return 'published';
        default: return '';
      }
    });

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeContentOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toHaveLength(1);
    expect(result[0].json).toEqual(mockResponse);
    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'GET',
      url: 'https://api.walkme.com/v2/content?organizationId=org123&contentType=walkthru&status=published',
      headers: {
        'Authorization': 'Bearer test-api-key',
        'Content-Type': 'application/json',
      },
      json: true,
    });
  });

  test('should get specific content item successfully', async () => {
    const mockResponse = {
      id: '123',
      name: 'Test Content',
      type: 'walkthru',
      steps: [{ id: 1, title: 'Step 1' }],
    };

    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
      switch (param) {
        case 'operation': return 'getContentItem';
        case 'contentId': return '123';
        case 'organizationId': return 'org123';
        default: return '';
      }
    });

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeContentOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toHaveLength(1);
    expect(result[0].json).toEqual(mockResponse);
  });

  test('should create content successfully', async () => {
    const mockResponse = {
      id: '456',
      name: 'New Content',
      type: 'walkthru',
      status: 'draft',
    };

    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
      switch (param) {
        case 'operation': return 'createContent';
        case 'name': return 'New Content';
        case 'type': return 'walkthru';
        case 'steps': return '[{"id": 1, "title": "Step 1"}]';
        case 'targeting': return '{"audience": "all"}';
        default: return '';
      }
    });

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeContentOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toHaveLength(1);
    expect(result[0].json).toEqual(mockResponse);
  });

  test('should publish content successfully', async () => {
    const mockResponse = {
      success: true,
      message: 'Content published successfully',
    };

    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
      switch (param) {
        case 'operation': return 'publishContent';
        case 'contentId': return '123';
        case 'environment': return 'production';
        default: return '';
      }
    });

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeContentOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toHaveLength(1);
    expect(result[0].json).toEqual(mockResponse);
  });

  test('should handle API errors correctly', async () => {
    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
      switch (param) {
        case 'operation': return 'getContent';
        case 'organizationId': return 'invalid-org';
        default: return '';
      }
    });

    const apiError = new Error('API Error');
    (apiError as any).response = {
      statusCode: 404,
      body: { error: 'Organization not found' },
    };

    mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(apiError);

    await expect(
      executeContentOperations.call(mockExecuteFunctions, [{ json: {} }])
    ).rejects.toThrow();
  });

  test('should handle invalid JSON in parameters', async () => {
    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
      switch (param) {
        case 'operation': return 'createContent';
        case 'name': return 'Test';
        case 'type': return 'walkthru';
        case 'steps': return 'invalid json';
        case 'targeting': return '{}';
        default: return '';
      }
    });

    await expect(
      executeContentOperations.call(mockExecuteFunctions, [{ json: {} }])
    ).rejects.toThrow('Invalid JSON in steps parameter');
  });
});

describe('Segments Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({
        apiKey: 'test-api-key',
        baseUrl: 'https://api.walkme.com/v2',
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: {
        httpRequest: jest.fn(),
        requestWithAuthentication: jest.fn(),
      },
    };
  });

  test('should get all segments successfully', async () => {
    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
      switch (param) {
        case 'operation':
          return 'getSegments';
        case 'organizationId':
          return 'org123';
        case 'status':
          return 'active';
        default:
          return undefined;
      }
    });

    const mockResponse = {
      segments: [
        { id: 'seg1', name: 'Test Segment 1', status: 'active' },
        { id: 'seg2', name: 'Test Segment 2', status: 'active' },
      ],
    };

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeSegmentsOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toHaveLength(1);
    expect(result[0].json).toEqual(mockResponse);
    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'GET',
      url: 'https://api.walkme.com/v2/segments',
      headers: {
        'Authorization': 'Bearer test-api-key',
        'Content-Type': 'application/json',
      },
      qs: {
        organizationId: 'org123',
        status: 'active',
      },
      json: true,
    });
  });

  test('should get specific segment successfully', async () => {
    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
      switch (param) {
        case 'operation':
          return 'getSegment';
        case 'segmentId':
          return 'seg123';
        case 'organizationId':
          return 'org123';
        default:
          return undefined;
      }
    });

    const mockResponse = {
      id: 'seg123',
      name: 'Test Segment',
      conditions: { browser: 'chrome' },
    };

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeSegmentsOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toHaveLength(1);
    expect(result[0].json).toEqual(mockResponse);
    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'GET',
      url: 'https://api.walkme.com/v2/segments/seg123',
      headers: {
        'Authorization': 'Bearer test-api-key',
        'Content-Type': 'application/json',
      },
      qs: {
        organizationId: 'org123',
      },
      json: true,
    });
  });

  test('should create segment successfully', async () => {
    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
      switch (param) {
        case 'operation':
          return 'createSegment';
        case 'name':
          return 'New Segment';
        case 'conditions':
          return '{"browser": "chrome"}';
        case 'organizationId':
          return 'org123';
        default:
          return undefined;
      }
    });

    const mockResponse = {
      id: 'seg456',
      name: 'New Segment',
      conditions: { browser: 'chrome' },
    };

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeSegmentsOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toHaveLength(1);
    expect(result[0].json).toEqual(mockResponse);
    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'POST',
      url: 'https://api.walkme.com/v2/segments',
      headers: {
        'Authorization': 'Bearer test-api-key',
        'Content-Type': 'application/json',
      },
      body: {
        name: 'New Segment',
        conditions: { browser: 'chrome' },
        organizationId: 'org123',
      },
      json: true,
    });
  });

  test('should update segment successfully', async () => {
    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
      switch (param) {
        case 'operation':
          return 'updateSegment';
        case 'segmentId':
          return 'seg123';
        case 'name':
          return 'Updated Segment';
        case 'conditions':
          return '{"browser": "firefox"}';
        default:
          return undefined;
      }
    });

    const mockResponse = {
      id: 'seg123',
      name: 'Updated Segment',
      conditions: { browser: 'firefox' },
    };

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeSegmentsOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toHaveLength(1);
    expect(result[0].json).toEqual(mockResponse);
    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'PUT',
      url: 'https://api.walkme.com/v2/segments/seg123',
      headers: {
        'Authorization': 'Bearer test-api-key',
        'Content-Type': 'application/json',
      },
      body: {
        name: 'Updated Segment',
        conditions: { browser: 'firefox' },
      },
      json: true,
    });
  });

  test('should delete segment successfully', async () => {
    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
      switch (param) {
        case 'operation':
          return 'deleteSegment';
        case 'segmentId':
          return 'seg123';
        case 'organizationId':
          return 'org123';
        default:
          return undefined;
      }
    });

    const mockResponse = { success: true };

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeSegmentsOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toHaveLength(1);
    expect(result[0].json).toEqual(mockResponse);
    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'DELETE',
      url: 'https://api.walkme.com/v2/segments/seg123',
      headers: {
        'Authorization': 'Bearer test-api-key',
        'Content-Type': 'application/json',
      },
      qs: {
        organizationId: 'org123',
      },
      json: true,
    });
  });

  test('should get segment users successfully', async () => {
    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
      switch (param) {
        case 'operation':
          return 'getSegmentUsers';
        case 'segmentId':
          return 'seg123';
        case 'page':
          return 1;
        case 'limit':
          return 50;
        default:
          return undefined;
      }
    });

    const mockResponse = {
      users: [
        { id: 'user1', email: 'user1@example.com' },
        { id: 'user2', email: 'user2@example.com' },
      ],
      pagination: { page: 1, limit: 50, total: 2 },
    };

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeSegmentsOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toHaveLength(1);
    expect(result[0].json).toEqual(mockResponse);
    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'GET',
      url: 'https://api.walkme.com/v2/segments/seg123/users',
      headers: {
        'Authorization': 'Bearer test-api-key',
        'Content-Type': 'application/json',
      },
      qs: {
        page: 1,
        limit: 50,
      },
      json: true,
    });
  });

  test('should handle invalid JSON in conditions', async () => {
    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
      switch (param) {
        case 'operation':
          return 'createSegment';
        case 'name':
          return 'New Segment';
        case 'conditions':
          return 'invalid json';
        case 'organizationId':
          return 'org123';
        default:
          return undefined;
      }
    });

    await expect(
      executeSegmentsOperations.call(mockExecuteFunctions, [{ json: {} }])
    ).rejects.toThrow();
  });
});

describe('Organizations Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({
        apiKey: 'test-api-key',
        baseUrl: 'https://api.walkme.com/v2',
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: {
        httpRequest: jest.fn(),
        requestWithAuthentication: jest.fn(),
      },
    };
  });

  test('should get organizations successfully', async () => {
    const mockResponse = {
      data: [
        { id: '123', name: 'Test Org 1' },
        { id: '456', name: 'Test Org 2' },
      ],
      total: 2,
    };

    mockExecuteFunctions.getNodeParameter.mockImplementation((paramName: string) => {
      switch (paramName) {
        case 'operation': return 'getOrganizations';
        case 'page': return 1;
        case 'limit': return 50;
        default: return undefined;
      }
    });

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeOrganizationsOperations.call(
      mockExecuteFunctions,
      [{ json: {} }],
    );

    expect(result).toHaveLength(1);
    expect(result[0].json).toEqual(mockResponse);
    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'GET',
      url: 'https://api.walkme.com/v2/organizations',
      headers: {
        'Authorization': 'Bearer test-api-key',
        'Content-Type': 'application/json',
      },
      qs: { page: 1, limit: 50 },
      json: true,
    });
  });

  test('should get single organization successfully', async () => {
    const mockResponse = { id: '123', name: 'Test Organization', settings: {} };

    mockExecuteFunctions.getNodeParameter.mockImplementation((paramName: string) => {
      switch (paramName) {
        case 'operation': return 'getOrganization';
        case 'organizationId': return '123';
        default: return undefined;
      }
    });

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeOrganizationsOperations.call(
      mockExecuteFunctions,
      [{ json: {} }],
    );

    expect(result).toHaveLength(1);
    expect(result[0].json).toEqual(mockResponse);
    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'GET',
      url: 'https://api.walkme.com/v2/organizations/123',
      headers: {
        'Authorization': 'Bearer test-api-key',
        'Content-Type': 'application/json',
      },
      json: true,
    });
  });

  test('should update organization successfully', async () => {
    const mockResponse = { id: '123', name: 'Updated Org', settings: { feature1: true } };

    mockExecuteFunctions.getNodeParameter.mockImplementation((paramName: string) => {
      switch (paramName) {
        case 'operation': return 'updateOrganization';
        case 'organizationId': return '123';
        case 'name': return 'Updated Org';
        case 'settings': return '{"feature1": true}';
        default: return undefined;
      }
    });

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeOrganizationsOperations.call(
      mockExecuteFunctions,
      [{ json: {} }],
    );

    expect(result).toHaveLength(1);
    expect(result[0].json).toEqual(mockResponse);
    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'PUT',
      url: 'https://api.walkme.com/v2/organizations/123',
      headers: {
        'Authorization': 'Bearer test-api-key',
        'Content-Type': 'application/json',
      },
      body: {
        name: 'Updated Org',
        settings: { feature1: true },
      },
      json: true,
    });
  });

  test('should get environments successfully', async () => {
    const mockResponse = {
      data: [
        { id: 'env1', name: 'Production', domain: 'app.example.com' },
        { id: 'env2', name: 'Staging', domain: 'staging.example.com' },
      ],
    };

    mockExecuteFunctions.getNodeParameter.mockImplementation((paramName: string) => {
      switch (paramName) {
        case 'operation': return 'getEnvironments';
        case 'organizationId': return '123';
        default: return undefined;
      }
    });

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeOrganizationsOperations.call(
      mockExecuteFunctions,
      [{ json: {} }],
    );

    expect(result).toHaveLength(1);
    expect(result[0].json).toEqual(mockResponse);
    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'GET',
      url: 'https://api.walkme.com/v2/organizations/123/environments',
      headers: {
        'Authorization': 'Bearer test-api-key',
        'Content-Type': 'application/json',
      },
      json: true,
    });
  });

  test('should create environment successfully', async () => {
    const mockResponse = { id: 'env3', name: 'Development', domain: 'dev.example.com' };

    mockExecuteFunctions.getNodeParameter.mockImplementation((paramName: string) => {
      switch (paramName) {
        case 'operation': return 'createEnvironment';
        case 'organizationId': return '123';
        case 'environmentName': return 'Development';
        case 'domain': return 'dev.example.com';
        default: return undefined;
      }
    });

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeOrganizationsOperations.call(
      mockExecuteFunctions,
      [{ json: {} }],
    );

    expect(result).toHaveLength(1);
    expect(result[0].json).toEqual(mockResponse);
    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'POST',
      url: 'https://api.walkme.com/v2/organizations/123/environments',
      headers: {
        'Authorization': 'Bearer test-api-key',
        'Content-Type': 'application/json',
      },
      body: {
        name: 'Development',
        domain: 'dev.example.com',
      },
      json: true,
    });
  });

  test('should update environment successfully', async () => {
    const mockResponse = { id: 'env1', settings: { feature1: true, feature2: false } };

    mockExecuteFunctions.getNodeParameter.mockImplementation((paramName: string) => {
      switch (paramName) {
        case 'operation': return 'updateEnvironment';
        case 'organizationId': return '123';
        case 'envId': return 'env1';
        case 'environmentSettings': return '{"feature1": true, "feature2": false}';
        default: return undefined;
      }
    });

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeOrganizationsOperations.call(
      mockExecuteFunctions,
      [{ json: {} }],
    );

    expect(result).toHaveLength(1);
    expect(result[0].json).toEqual(mockResponse);
    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'PUT',
      url: 'https://api.walkme.com/v2/organizations/123/environments/env1',
      headers: {
        'Authorization': 'Bearer test-api-key',
        'Content-Type': 'application/json',
      },
      body: {
        settings: { feature1: true, feature2: false },
      },
      json: true,
    });
  });

  test('should handle API errors', async () => {
    const mockError = {
      message: 'Organization not found',
      httpCode: '404',
    };

    mockExecuteFunctions.getNodeParameter.mockImplementation((paramName: string) => {
      switch (paramName) {
        case 'operation': return 'getOrganization';
        case 'organizationId': return 'invalid';
        default: return undefined;
      }
    });

    mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(mockError);

    await expect(
      executeOrganizationsOperations.call(mockExecuteFunctions, [{ json: {} }]),
    ).rejects.toThrow();
  });

  test('should handle invalid JSON in settings', async () => {
    mockExecuteFunctions.getNodeParameter.mockImplementation((paramName: string) => {
      switch (paramName) {
        case 'operation': return 'updateOrganization';
        case 'organizationId': return '123';
        case 'name': return 'Test Org';
        case 'settings': return 'invalid json';
        default: return undefined;
      }
    });

    await expect(
      executeOrganizationsOperations.call(mockExecuteFunctions, [{ json: {} }]),
    ).rejects.toThrow('Invalid JSON in settings parameter');
  });
});
});
