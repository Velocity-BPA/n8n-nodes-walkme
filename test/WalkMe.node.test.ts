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
        apiKey: 'test-key',
        baseUrl: 'https://api.walkme.com/v2',
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: {
        httpRequest: jest.fn(),
      },
    };
  });

  describe('getUsers operation', () => {
    it('should retrieve users successfully', async () => {
      const mockResponse = { users: [{ id: '1', email: 'test@example.com' }] };
      mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getUsers');
      mockExecuteFunctions.getNodeParameter.mockReturnValueOnce(1);
      mockExecuteFunctions.getNodeParameter.mockReturnValueOnce(50);
      mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('');
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValueOnce(mockResponse);

      const items = [{ json: {} }];
      const result = await executeUsersOperations.call(mockExecuteFunctions, items);

      expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
    });

    it('should handle errors gracefully', async () => {
      mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getUsers');
      mockExecuteFunctions.getNodeParameter.mockReturnValueOnce(1);
      mockExecuteFunctions.getNodeParameter.mockReturnValueOnce(50);
      mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('');
      mockExecuteFunctions.helpers.httpRequest.mockRejectedValueOnce(new Error('API Error'));
      mockExecuteFunctions.continueOnFail.mockReturnValueOnce(true);

      const items = [{ json: {} }];
      const result = await executeUsersOperations.call(mockExecuteFunctions, items);

      expect(result).toEqual([{ json: { error: 'API Error' }, pairedItem: { item: 0 } }]);
    });
  });

  describe('getUser operation', () => {
    it('should retrieve a specific user successfully', async () => {
      const mockResponse = { id: '123', email: 'test@example.com' };
      mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getUser');
      mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('123');
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValueOnce(mockResponse);

      const items = [{ json: {} }];
      const result = await executeUsersOperations.call(mockExecuteFunctions, items);

      expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
    });
  });

  describe('createUser operation', () => {
    it('should create a user successfully', async () => {
      const mockResponse = { id: '456', email: 'newuser@example.com' };
      mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('createUser');
      mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('newuser@example.com');
      mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('John Doe');
      mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('Admin');
      mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('IT');
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValueOnce(mockResponse);

      const items = [{ json: {} }];
      const result = await executeUsersOperations.call(mockExecuteFunctions, items);

      expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
    });
  });

  describe('updateUser operation', () => {
    it('should update a user successfully', async () => {
      const mockResponse = { id: '123', email: 'updated@example.com' };
      mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('updateUser');
      mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('123');
      mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('updated@example.com');
      mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('Jane Doe');
      mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('Manager');
      mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('HR');
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValueOnce(mockResponse);

      const items = [{ json: {} }];
      const result = await executeUsersOperations.call(mockExecuteFunctions, items);

      expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
    });
  });

  describe('deleteUser operation', () => {
    it('should delete a user successfully', async () => {
      const mockResponse = { success: true };
      mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('deleteUser');
      mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('123');
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValueOnce(mockResponse);

      const items = [{ json: {} }];
      const result = await executeUsersOperations.call(mockExecuteFunctions, items);

      expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
    });
  });

  describe('getUserActivity operation', () => {
    it('should retrieve user activity successfully', async () => {
      const mockResponse = { activities: [] };
      mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getUserActivity');
      mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('123');
      mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('2023-01-01T00:00:00Z');
      mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('2023-12-31T23:59:59Z');
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValueOnce(mockResponse);

      const items = [{ json: {} }];
      const result = await executeUsersOperations.call(mockExecuteFunctions, items);

      expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
    });
  });
});

describe('Analytics Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({ 
        apiKey: 'test-key', 
        baseUrl: 'https://api.walkme.com/v2' 
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: { 
        httpRequest: jest.fn(),
        requestWithAuthentication: jest.fn() 
      },
    };
  });

  it('should get insights successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('getInsights')
      .mockReturnValueOnce('2023-01-01')
      .mockReturnValueOnce('2023-01-31')
      .mockReturnValueOnce('engagement');

    const mockResponse = { insights: [], total: 0 };
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeAnalyticsOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'GET',
      url: 'https://api.walkme.com/v2/analytics/insights',
      headers: {
        'Authorization': 'Bearer test-key',
        'Content-Type': 'application/json',
      },
      qs: {
        startDate: '2023-01-01T00:00:00.000Z',
        endDate: '2023-01-31T00:00:00.000Z',
        metric: 'engagement',
      },
      json: true,
    });

    expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
  });

  it('should get engagement metrics successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('getEngagement')
      .mockReturnValueOnce('2023-01-01')
      .mockReturnValueOnce('2023-01-31')
      .mockReturnValueOnce('segment123');

    const mockResponse = { engagement: [], metrics: {} };
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeAnalyticsOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
  });

  it('should track custom event successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('trackCustomEvent')
      .mockReturnValueOnce('button_click')
      .mockReturnValueOnce('user123')
      .mockReturnValueOnce('{"page": "dashboard"}');

    const mockResponse = { success: true, eventId: 'event123' };
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeAnalyticsOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
  });

  it('should handle API errors gracefully', async () => {
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getInsights');
    mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));
    mockExecuteFunctions.continueOnFail.mockReturnValue(true);

    const result = await executeAnalyticsOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toEqual([{ json: { error: 'API Error' }, pairedItem: { item: 0 } }]);
  });

  it('should throw error for unknown operation', async () => {
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('unknownOperation');

    await expect(executeAnalyticsOperations.call(mockExecuteFunctions, [{ json: {} }]))
      .rejects.toThrow('Unknown operation: unknownOperation');
  });
});

describe('Walkthroughs Resource', () => {
	let mockExecuteFunctions: any;

	beforeEach(() => {
		mockExecuteFunctions = {
			getNodeParameter: jest.fn(),
			getCredentials: jest.fn().mockResolvedValue({ apiKey: 'test-key', baseUrl: 'https://api.walkme.com/v2' }),
			getInputData: jest.fn().mockReturnValue([{ json: {} }]),
			getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
			continueOnFail: jest.fn().mockReturnValue(false),
			helpers: { httpRequest: jest.fn(), requestWithAuthentication: jest.fn() },
		};
	});

	it('should get all walkthroughs successfully', async () => {
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('getWalkthroughs')
			.mockReturnValueOnce('active')
			.mockReturnValueOnce('test-tag')
			.mockReturnValueOnce(1);

		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({ data: [] });

		const result = await executeWalkthroughsOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toEqual([{ json: { data: [] }, pairedItem: { item: 0 } }]);
		expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
			method: 'GET',
			url: 'https://api.walkme.com/v2/walkthroughs?status=active&tag=test-tag&page=1',
			headers: {
				'Authorization': 'Bearer test-key',
				'Content-Type': 'application/json',
			},
			json: true,
		});
	});

	it('should get specific walkthrough successfully', async () => {
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('getWalkthrough')
			.mockReturnValueOnce('123');

		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({ id: '123', name: 'Test Walkthrough' });

		const result = await executeWalkthroughsOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toEqual([{ json: { id: '123', name: 'Test Walkthrough' }, pairedItem: { item: 0 } }]);
	});

	it('should create walkthrough successfully', async () => {
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('createWalkthrough')
			.mockReturnValueOnce('New Walkthrough')
			.mockReturnValueOnce('[{"step": 1}]')
			.mockReturnValueOnce('https://example.com')
			.mockReturnValueOnce(true);

		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({ id: '123', name: 'New Walkthrough' });

		const result = await executeWalkthroughsOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toEqual([{ json: { id: '123', name: 'New Walkthrough' }, pairedItem: { item: 0 } }]);
	});

	it('should update walkthrough successfully', async () => {
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('updateWalkthrough')
			.mockReturnValueOnce('123')
			.mockReturnValueOnce('Updated Walkthrough')
			.mockReturnValueOnce('[{"step": 1}]')
			.mockReturnValueOnce(false);

		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({ id: '123', name: 'Updated Walkthrough' });

		const result = await executeWalkthroughsOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toEqual([{ json: { id: '123', name: 'Updated Walkthrough' }, pairedItem: { item: 0 } }]);
	});

	it('should delete walkthrough successfully', async () => {
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('deleteWalkthrough')
			.mockReturnValueOnce('123');

		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({ success: true });

		const result = await executeWalkthroughsOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toEqual([{ json: { success: true }, pairedItem: { item: 0 } }]);
	});

	it('should publish walkthrough successfully', async () => {
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('publishWalkthrough')
			.mockReturnValueOnce('123');

		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({ published: true });

		const result = await executeWalkthroughsOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toEqual([{ json: { published: true }, pairedItem: { item: 0 } }]);
	});

	it('should handle errors when continue on fail is true', async () => {
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getWalkthroughs');
		mockExecuteFunctions.continueOnFail.mockReturnValue(true);
		mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));

		const result = await executeWalkthroughsOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toEqual([{ json: { error: 'API Error' }, pairedItem: { item: 0 } }]);
	});

	it('should throw error when continue on fail is false', async () => {
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getWalkthroughs');
		mockExecuteFunctions.continueOnFail.mockReturnValue(false);
		mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));

		await expect(executeWalkthroughsOperations.call(mockExecuteFunctions, [{ json: {} }])).rejects.toThrow('API Error');
	});
});

describe('SmartTips Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({ 
        apiKey: 'test-key', 
        baseUrl: 'https://api.walkme.com/v2'
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: { 
        httpRequest: jest.fn(),
        requestWithAuthentication: jest.fn()
      },
    };
  });

  describe('getSmartTips operation', () => {
    it('should get smart tips successfully', async () => {
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('getSmartTips')
        .mockReturnValueOnce('active')
        .mockReturnValueOnce('tutorial')
        .mockReturnValueOnce(1);

      const mockResponse = { tips: [{ id: '1', title: 'Test Tip' }] };
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const result = await executeSmartTipsOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result[0].json).toEqual(mockResponse);
      expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
        method: 'GET',
        url: 'https://api.walkme.com/v2/smarttips?status=active&category=tutorial&page=1',
        headers: {
          'Authorization': 'Bearer test-key',
          'Content-Type': 'application/json',
        },
        json: true,
      });
    });

    it('should handle error in getSmartTips', async () => {
      mockExecuteFunctions.getNodeParameter.mockReturnValue('getSmartTips');
      mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));
      mockExecuteFunctions.continueOnFail.mockReturnValue(true);

      const result = await executeSmartTipsOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result[0].json.error).toBe('API Error');
    });
  });

  describe('createSmartTip operation', () => {
    it('should create smart tip successfully', async () => {
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('createSmartTip')
        .mockReturnValueOnce('Test Title')
        .mockReturnValueOnce('Test Content')
        .mockReturnValueOnce('click')
        .mockReturnValueOnce('.test-element');

      const mockResponse = { id: '123', title: 'Test Title' };
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const result = await executeSmartTipsOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result[0].json).toEqual(mockResponse);
      expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
        method: 'POST',
        url: 'https://api.walkme.com/v2/smarttips',
        headers: {
          'Authorization': 'Bearer test-key',
          'Content-Type': 'application/json',
        },
        body: {
          title: 'Test Title',
          content: 'Test Content',
          trigger: 'click',
          targetElement: '.test-element',
        },
        json: true,
      });
    });
  });

  describe('deleteSmartTip operation', () => {
    it('should delete smart tip successfully', async () => {
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('deleteSmartTip')
        .mockReturnValueOnce('123');

      const mockResponse = { success: true };
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

      const result = await executeSmartTipsOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result[0].json).toEqual(mockResponse);
      expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
        method: 'DELETE',
        url: 'https://api.walkme.com/v2/smarttips/123',
        headers: {
          'Authorization': 'Bearer test-key',
          'Content-Type': 'application/json',
        },
        json: true,
      });
    });
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
			getNode: jest.fn().mockReturnValue({ name: 'WalkMe Segments Test' }),
			continueOnFail: jest.fn().mockReturnValue(false),
			helpers: {
				httpRequest: jest.fn(),
			},
		};
	});

	describe('getSegments operation', () => {
		it('should get segments successfully', async () => {
			const mockResponse = {
				segments: [
					{ id: '1', name: 'Test Segment 1' },
					{ id: '2', name: 'Test Segment 2' },
				],
				total: 2,
			};

			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('getSegments')
				.mockReturnValueOnce(1)
				.mockReturnValueOnce(50);
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeSegmentsOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([
				{
					json: mockResponse,
					pairedItem: { item: 0 },
				},
			]);
		});

		it('should handle getSegments error', async () => {
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('getSegments')
				.mockReturnValueOnce(1)
				.mockReturnValueOnce(50);
			mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));
			mockExecuteFunctions.continueOnFail.mockReturnValue(true);

			const result = await executeSegmentsOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([
				{
					json: { error: 'API Error' },
					pairedItem: { item: 0 },
				},
			]);
		});
	});

	describe('getSegment operation', () => {
		it('should get specific segment successfully', async () => {
			const mockResponse = { id: '123', name: 'Test Segment', rules: {} };

			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('getSegment')
				.mockReturnValueOnce('123');
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeSegmentsOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([
				{
					json: mockResponse,
					pairedItem: { item: 0 },
				},
			]);
		});
	});

	describe('createSegment operation', () => {
		it('should create segment successfully', async () => {
			const mockResponse = { id: '123', name: 'New Segment', rules: { country: 'US' } };

			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('createSegment')
				.mockReturnValueOnce('New Segment')
				.mockReturnValueOnce({ country: 'US' })
				.mockReturnValueOnce('Test description');
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeSegmentsOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([
				{
					json: mockResponse,
					pairedItem: { item: 0 },
				},
			]);
		});
	});

	describe('updateSegment operation', () => {
		it('should update segment successfully', async () => {
			const mockResponse = { id: '123', name: 'Updated Segment', rules: { country: 'UK' } };

			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('updateSegment')
				.mockReturnValueOnce('123')
				.mockReturnValueOnce('Updated Segment')
				.mockReturnValueOnce({ country: 'UK' });
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeSegmentsOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([
				{
					json: mockResponse,
					pairedItem: { item: 0 },
				},
			]);
		});
	});

	describe('deleteSegment operation', () => {
		it('should delete segment successfully', async () => {
			const mockResponse = { success: true };

			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('deleteSegment')
				.mockReturnValueOnce('123');
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeSegmentsOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([
				{
					json: mockResponse,
					pairedItem: { item: 0 },
				},
			]);
		});
	});

	describe('getSegmentUsers operation', () => {
		it('should get segment users successfully', async () => {
			const mockResponse = {
				users: [
					{ id: 'user1', email: 'user1@example.com' },
					{ id: 'user2', email: 'user2@example.com' },
				],
				total: 2,
			};

			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('getSegmentUsers')
				.mockReturnValueOnce('123')
				.mockReturnValueOnce(1);
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeSegmentsOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([
				{
					json: mockResponse,
					pairedItem: { item: 0 },
				},
			]);
		});
	});
});
});
