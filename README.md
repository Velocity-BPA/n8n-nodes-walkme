# n8n-nodes-walkme

> **[Velocity BPA Licensing Notice]**
>
> This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).
>
> Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA.
>
> For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.

This n8n community node provides comprehensive integration with WalkMe's Digital Adoption Platform, enabling automation across 5 core resources including Users, Analytics, Content, Segments, and Organizations. Streamline user onboarding workflows, analyze digital adoption metrics, manage content lifecycle, segment user populations, and orchestrate organizational settings through n8n's visual automation interface.

![n8n Community Node](https://img.shields.io/badge/n8n-Community%20Node-blue)
![License](https://img.shields.io/badge/license-BSL--1.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![WalkMe API](https://img.shields.io/badge/WalkMe-API%20Integration-orange)
![Digital Adoption](https://img.shields.io/badge/Digital%20Adoption-Platform-green)
![User Analytics](https://img.shields.io/badge/User-Analytics-purple)

## Features

- **User Management** - Create, update, and manage user accounts with role assignments and permissions
- **Analytics & Insights** - Extract digital adoption metrics, user engagement data, and performance analytics
- **Content Operations** - Manage Smart Walk-Thrus, SmartTips, and other WalkMe content programmatically
- **Segment Management** - Create and maintain user segments for targeted digital adoption campaigns
- **Organization Control** - Configure organizational settings, domains, and administrative preferences
- **Workflow Automation** - Trigger automated responses based on user behavior and adoption milestones
- **Data Synchronization** - Sync user data between WalkMe and external systems seamlessly
- **Bulk Operations** - Perform batch operations across users, content, and segments efficiently

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
| Base URL | Custom API base URL (if using private cloud) | No |

## Resources & Operations

### 1. Users

| Operation | Description |
|-----------|-------------|
| Create | Create a new user account in WalkMe |
| Get | Retrieve user information by ID or email |
| Update | Update user profile, roles, or permissions |
| Delete | Remove user account from the system |
| List | Get paginated list of users with filtering options |
| Get Activity | Retrieve user's activity and engagement metrics |
| Reset Password | Initiate password reset for specified user |
| Assign Role | Assign or modify user roles and permissions |

### 2. Analytics

| Operation | Description |
|-----------|-------------|
| Get Usage Stats | Retrieve overall platform usage statistics |
| Get User Engagement | Get detailed user engagement metrics |
| Get Content Performance | Analyze performance of specific content items |
| Get Completion Rates | Retrieve completion rates for Smart Walk-Thrus |
| Get Session Data | Extract user session data and behavior patterns |
| Export Report | Generate and export analytics reports |
| Get Funnel Analysis | Analyze user journey and conversion funnels |
| Get Heatmap Data | Retrieve click and interaction heatmap data |

### 3. Content

| Operation | Description |
|-----------|-------------|
| Create | Create new Smart Walk-Thru, SmartTips, or other content |
| Get | Retrieve content item details and configuration |
| Update | Modify existing content properties and settings |
| Delete | Remove content item from the system |
| List | Get paginated list of content with filtering |
| Publish | Publish content to make it available to users |
| Unpublish | Remove content from active distribution |
| Duplicate | Create copy of existing content item |
| Get Statistics | Retrieve performance statistics for content |

### 4. Segments

| Operation | Description |
|-----------|-------------|
| Create | Create new user segment with defined criteria |
| Get | Retrieve segment configuration and member count |
| Update | Modify segment criteria and properties |
| Delete | Remove segment from the system |
| List | Get all segments with filtering options |
| Add Users | Add specific users to a segment |
| Remove Users | Remove users from a segment |
| Get Members | Retrieve list of users in a segment |

### 5. Organizations

| Operation | Description |
|-----------|-------------|
| Get Settings | Retrieve organization configuration settings |
| Update Settings | Modify organizational preferences and policies |
| Get Domains | List configured domains for the organization |
| Add Domain | Add new domain to organization configuration |
| Remove Domain | Remove domain from organization |
| Get Branding | Retrieve branding and styling configuration |
| Update Branding | Modify organization branding and appearance |
| Get Integrations | List active integrations and connections |

## Usage Examples

```javascript
// Create a new user and assign to segment
{
  "name": "Create User",
  "type": "n8n-nodes-walkme.walkMe",
  "parameters": {
    "resource": "users",
    "operation": "create",
    "email": "john.doe@company.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "end_user",
    "segments": ["new_employees", "sales_team"]
  }
}
```

```javascript
// Get content performance analytics
{
  "name": "Get Analytics",
  "type": "n8n-nodes-walkme.walkMe",
  "parameters": {
    "resource": "analytics",
    "operation": "getContentPerformance",
    "contentId": "wt_12345",
    "dateRange": "last_30_days",
    "metrics": ["views", "completions", "dropoff_rate"]
  }
}
```

```javascript
// Update Smart Walk-Thru content
{
  "name": "Update Content",
  "type": "n8n-nodes-walkme.walkMe",
  "parameters": {
    "resource": "content",
    "operation": "update",
    "contentId": "wt_67890",
    "title": "Updated Onboarding Flow",
    "description": "Revised user onboarding process",
    "status": "published"
  }
}
```

```javascript
// Create targeted user segment
{
  "name": "Create Segment",
  "type": "n8n-nodes-walkme.walkMe",
  "parameters": {
    "resource": "segments",
    "operation": "create",
    "name": "Power Users",
    "criteria": {
      "loginFrequency": "daily",
      "completedWalkthroughs": "> 5",
      "department": "engineering"
    }
  }
}
```

## Error Handling

| Error | Description | Solution |
|-------|-------------|----------|
| 401 Unauthorized | Invalid API key or expired credentials | Verify API key in credentials configuration |
| 403 Forbidden | Insufficient permissions for requested operation | Check user role and API key permissions |
| 404 Not Found | Requested resource (user, content, segment) not found | Verify resource ID exists and is accessible |
| 429 Rate Limited | API rate limit exceeded | Implement delays between requests or reduce frequency |
| 400 Bad Request | Invalid parameters or malformed request data | Review parameter format and required fields |
| 500 Internal Server Error | WalkMe API service error | Check WalkMe service status and retry later |

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
- **WalkMe API Documentation**: [WalkMe Developer Portal](https://developers.walkme.com/)
- **WalkMe Community**: [WalkMe Community Hub](https://community.walkme.com/)