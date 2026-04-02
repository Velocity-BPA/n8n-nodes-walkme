# n8n-nodes-walkme

> **[Velocity BPA Licensing Notice]**
>
> This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).
>
> Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA.
>
> For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.

A comprehensive n8n community node for WalkMe's Digital Adoption Platform. This node provides access to 5 core resources enabling automation of user onboarding, analytics tracking, walkthrough management, and smart tip delivery within your digital experiences.

![n8n Community Node](https://img.shields.io/badge/n8n-Community%20Node-blue)
![License](https://img.shields.io/badge/license-BSL--1.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![Digital Adoption](https://img.shields.io/badge/Digital-Adoption-orange)
![User Onboarding](https://img.shields.io/badge/User-Onboarding-green)
![Analytics](https://img.shields.io/badge/Analytics-Tracking-purple)

## Features

- **User Management** - Create, update, delete, and retrieve WalkMe users with full profile management
- **Analytics Integration** - Access comprehensive usage analytics, engagement metrics, and performance data
- **Walkthrough Automation** - Manage interactive walkthroughs, publish content, and control user flows
- **SmartTips Control** - Create and manage contextual tips and guidance elements
- **Segment Management** - Define and manage user segments for targeted experiences
- **Real-time Sync** - Seamless integration with WalkMe's platform for live data updates
- **Bulk Operations** - Efficient batch processing for large-scale user and content management
- **Error Handling** - Comprehensive error handling with detailed logging and recovery options

## Installation

### Community Nodes (Recommended)

1. Open n8n
2. Go to **Settings** → **Community Nodes**
3. Click **Install a community node**
4. Enter `n8n-nodes-walkme`
5. Click **Install**

### Manual Installation

```bash
cd ~/.n8n
npm install n8n-nodes-walkme
```

### Development Installation

```bash
git clone https://github.com/Velocity-BPA/n8n-nodes-walkme.git
cd n8n-nodes-walkme
npm install
npm run build
mkdir -p ~/.n8n/custom
ln -s $(pwd) ~/.n8n/custom/n8n-nodes-walkme
n8n start
```

## Credentials Setup

| Field | Description | Required |
|-------|-------------|----------|
| API Key | Your WalkMe API key from the Admin Center | Yes |
| Environment | WalkMe environment (production/staging) | Yes |
| Base URL | Custom API base URL (if applicable) | No |

## Resources & Operations

### 1. Users

| Operation | Description |
|-----------|-------------|
| Create | Create a new user in WalkMe system |
| Update | Update existing user information and properties |
| Delete | Remove a user from the WalkMe system |
| Get | Retrieve user details by ID or email |
| List | Get paginated list of users with filtering options |
| Bulk Import | Import multiple users in a single operation |

### 2. Analytics

| Operation | Description |
|-----------|-------------|
| Get Events | Retrieve user interaction events and tracking data |
| Get Metrics | Fetch engagement metrics and KPIs |
| Get Reports | Generate and retrieve analytics reports |
| Get Usage Stats | Access usage statistics and performance data |
| Export Data | Export analytics data in various formats |

### 3. Walkthroughs

| Operation | Description |
|-----------|-------------|
| Create | Create new interactive walkthroughs |
| Update | Modify existing walkthrough content and settings |
| Delete | Remove walkthroughs from the system |
| Get | Retrieve walkthrough details and configuration |
| List | Get all walkthroughs with filtering options |
| Publish | Publish walkthroughs to make them live |
| Unpublish | Unpublish walkthroughs to stop them |

### 4. SmartTips

| Operation | Description |
|-----------|-------------|
| Create | Create new contextual tips and guidance |
| Update | Modify existing SmartTip content and triggers |
| Delete | Remove SmartTips from the system |
| Get | Retrieve SmartTip details and configuration |
| List | Get all SmartTips with filtering and search |
| Activate | Activate SmartTips for user display |
| Deactivate | Deactivate SmartTips to hide them |

### 5. Segments

| Operation | Description |
|-----------|-------------|
| Create | Create new user segments with criteria |
| Update | Modify segment rules and conditions |
| Delete | Remove segments from the system |
| Get | Retrieve segment details and user count |
| List | Get all segments with metadata |
| Add Users | Add users to specific segments |
| Remove Users | Remove users from segments |

## Usage Examples

```javascript
// Create a new user with custom properties
{
  "email": "john.doe@company.com",
  "name": "John Doe",
  "role": "developer",
  "department": "engineering",
  "customProperties": {
    "onboardingComplete": false,
    "skillLevel": "intermediate"
  }
}
```

```javascript
// Get analytics for walkthrough engagement
{
  "resourceType": "walkthroughs",
  "dateRange": {
    "start": "2024-01-01",
    "end": "2024-01-31"
  },
  "metrics": ["completion_rate", "engagement_time", "user_count"],
  "segmentId": "enterprise_users"
}
```

```javascript
// Create a targeted SmartTip
{
  "title": "New Feature Available",
  "content": "Check out our new dashboard analytics feature!",
  "trigger": {
    "selector": "#dashboard-menu",
    "event": "hover"
  },
  "targeting": {
    "segments": ["power_users"],
    "userProperties": {
      "featureAccess": "premium"
    }
  }
}
```

```javascript
// Bulk import users with segment assignment
{
  "users": [
    {
      "email": "user1@company.com",
      "name": "User One",
      "segments": ["new_users", "sales_team"]
    },
    {
      "email": "user2@company.com", 
      "name": "User Two",
      "segments": ["existing_users", "support_team"]
    }
  ],
  "options": {
    "sendWelcomeEmail": true,
    "autoAssignWalkthrough": "onboarding_flow"
  }
}
```

## Error Handling

| Error | Description | Solution |
|-------|-------------|----------|
| Authentication Failed | Invalid or expired API key | Verify API key in credentials and check expiration |
| Rate Limit Exceeded | Too many requests to WalkMe API | Implement delays between requests or use bulk operations |
| Resource Not Found | Requested user, walkthrough, or segment doesn't exist | Verify resource ID and check if resource was deleted |
| Validation Error | Invalid data format or missing required fields | Check request payload against WalkMe API documentation |
| Permission Denied | API key lacks required permissions | Contact WalkMe admin to update API key permissions |
| Server Error | WalkMe service temporarily unavailable | Retry request after delay or check WalkMe status page |

## Development

```bash
npm install
npm run build
npm test
npm run lint
npm run dev
```

## Author

**Velocity BPA**
- Website: [velobpa.com](https://velobpa.com)
- GitHub: [Velocity-BPA](https://github.com/Velocity-BPA)

## Licensing

This n8n community node is licensed under the **Business Source License 1.1**.

### Free Use
Permitted for personal, educational, research, and internal business use.

### Commercial Use
Use of this node within any SaaS, PaaS, hosted platform, managed service, or paid automation offering requires a commercial license.

For licensing inquiries: **licensing@velobpa.com**

See [LICENSE](LICENSE), [COMMERCIAL_LICENSE.md](COMMERCIAL_LICENSE.md), and [LICENSING_FAQ.md](LICENSING_FAQ.md) for details.

## Contributing

Contributions are welcome! Please ensure:

1. Code follows existing style conventions
2. All tests pass (`npm test`)
3. Linting passes (`npm run lint`)
4. Documentation is updated for new features
5. Commit messages are descriptive

## Support

- **Issues**: [GitHub Issues](https://github.com/Velocity-BPA/n8n-nodes-walkme/issues)
- **WalkMe API Documentation**: [WalkMe Developer Center](https://developers.walkme.com)
- **WalkMe Community**: [WalkMe Community Portal](https://community.walkme.com)