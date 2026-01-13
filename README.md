# n8n-nodes-walkme

> [Velocity BPA Licensing Notice]
>
> This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).
>
> Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA.
>
> For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.

A comprehensive n8n community node for WalkMe Digital Adoption Platform (DAP), providing complete integration with WalkMe's REST APIs. Features 12 resources, 80+ operations, webhook trigger support, and multi-region connectivity.

![n8n](https://img.shields.io/badge/n8n-community--node-orange)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-BSL--1.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)

## Features

- **User Management**: Full CRUD operations with role assignment, activation/deactivation, and password reset
- **End User Updates**: Real-time attribute updates with bulk operation and attribute definition management
- **Content Management**: Manage Smart Walk-Thrus, Resources, Surveys, Launchers, ShoutOuts with versioning and rollback
- **Analytics**: Comprehensive analytics with completion rates, funnel analysis, user journeys, and goal metrics
- **Multi-Language**: Export/import translations in JSON, XLIFF, and CSV with status tracking
- **Discovery Apps**: Track discovered applications with categorization, tagging, and trend analysis
- **Systems**: Full system management with settings and installation script retrieval
- **Segments**: Create and manage user segments with rule-based targeting
- **Goals**: Define and track business goals with content association
- **Checksum**: Verify content integrity across environments
- **Self-Hosted**: Download self-hosted WalkMe files and versions
- **API Keys**: Manage API keys with rotation and scope control
- **Webhook Trigger**: React to WalkMe events in real-time
- **Multi-Region Support**: US, EU, FedRAMP, and Canada data centers

## Installation

### Community Nodes (Recommended)

1. Go to **Settings** > **Community Nodes** in your n8n instance
2. Select **Install**
3. Enter `n8n-nodes-walkme` in the package name field
4. Agree to the risks and click **Install**

### Manual Installation

```bash
# Navigate to your n8n installation directory
cd ~/.n8n

# Install the package
npm install n8n-nodes-walkme

# Restart n8n
n8n start
```

## Credentials Setup

Configure your WalkMe API credentials in n8n:

| Field | Description |
|-------|-------------|
| **Username** | Your WalkMe API username (Client ID) |
| **Password** | Your WalkMe API password (Client Secret) |
| **Region** | Your WalkMe data center region (US, EU, FedRAMP, Canada) |

To obtain API credentials, contact your WalkMe Account Manager.

## Resources & Operations

### User (User Provisioning)

| Operation | Description |
|-----------|-------------|
| List | List all WalkMe users with filtering |
| Get | Get user details by ID |
| Create | Create a new user |
| Update | Update user properties |
| Delete | Delete a user |
| Assign Role | Assign a role to a user |
| Remove Role | Remove a role from a user |
| List Roles | List available roles |
| Get Permissions | Get user's effective permissions |
| Activate | Activate a user account |
| Deactivate | Deactivate a user account |
| Reset Password | Trigger password reset |

### End User

| Operation | Description |
|-----------|-------------|
| Update | Update end user attributes |
| Bulk Update | Batch update multiple end users |
| Get | Retrieve end user data |
| Get Attributes | Get end user attribute definitions |
| Create Attribute Definition | Define a new attribute |
| Delete Attribute Definition | Remove an attribute definition |
| Get Segments | Get segments for an end user |
| List Integrations | List incoming integrations |

### Content

| Operation | Description |
|-----------|-------------|
| List | List all content items |
| Get | Get content details by ID |
| Publish | Publish content to an environment |
| Unpublish | Unpublish content from an environment |
| Get Analytics | Get content performance analytics |
| List Smart Walk-Thrus | List all Smart Walk-Thrus |
| List Resources | List all Resources |
| List ShoutOuts | List all ShoutOuts |
| List Launchers | List all Launchers |
| List Surveys | List all Surveys |
| Get Versions | Get content version history |
| Rollback | Rollback to a previous version |

### Analytics

| Operation | Description |
|-----------|-------------|
| Get Overview | Get analytics overview |
| Get Completion Rates | Get completion rate metrics |
| Get Content Performance | Get content metrics |
| Get User Engagement | Get engagement data |
| Get Funnel Analysis | Get funnel data |
| Get Time To Complete | Get timing metrics |
| Get User Journeys | Get journey analytics |
| Get Goal Metrics | Get goal completion data |
| Export | Export analytics data |

### Multi-Language

| Operation | Description |
|-----------|-------------|
| List Languages | List configured languages |
| Get Language | Get language details |
| Add Language | Add a new language |
| Remove Language | Remove a language |
| Export Translations | Export translation files |
| Import Translations | Import translations |
| Get Translation Status | Get translation completion status |
| Update Translations | Update specific translations |

### Discovery Apps

| Operation | Description |
|-----------|-------------|
| Get Stats | Get discovered apps statistics |
| List Apps | List all discovered applications |
| Get App Details | Get app usage details |
| Categorize App | Assign category to app |
| Add Tag | Tag an application |
| Remove Tag | Remove tag from app |
| Get App Users | Get users of an app |
| Get App Trends | Get app usage trends |
| Export Report | Export apps data |

### Systems

| Operation | Description |
|-----------|-------------|
| List | List all WalkMe systems |
| Get | Get system details |
| Create | Create a new system |
| Update | Update system properties |
| Delete | Delete a system |
| Get Settings | Get system configuration |
| Update Settings | Update system configuration |
| Get Installation Script | Get tracking snippet |

### Segments

| Operation | Description |
|-----------|-------------|
| List | List all segments |
| Get | Get segment details |
| Create | Create a new segment |
| Update | Update segment rules |
| Delete | Delete a segment |
| Get Members | Get users in a segment |
| Get Analytics | Get segment metrics |
| Clone | Duplicate a segment |

### Goals

| Operation | Description |
|-----------|-------------|
| List | List all goals |
| Get | Get goal details |
| Create | Create a new goal |
| Update | Update goal definition |
| Delete | Delete a goal |
| Get Progress | Get goal completion data |
| Get Trends | Get goal trends over time |
| Associate Content | Link content to a goal |

### Checksum

| Operation | Description |
|-----------|-------------|
| Get | Get published content checksum |
| Verify | Verify content integrity |
| Compare | Compare checksums across environments |

### Self-Hosted

| Operation | Description |
|-----------|-------------|
| List Versions | List available versions |
| Get Latest Version | Get latest version info |
| Download Files | Download self-hosted files |
| Download Version | Download specific version |

### API Keys

| Operation | Description |
|-----------|-------------|
| List | List all API keys |
| Create | Generate new API key |
| Update | Update key settings |
| Delete | Revoke API key |
| Rotate | Rotate API key |

## WalkMe Trigger

The WalkMe Trigger node listens for webhook events from WalkMe.

### Supported Events

| Event | Description |
|-------|-------------|
| content.completed | User completed content |
| content.started | User started content |
| content.abandoned | User abandoned content |
| goal.achieved | Goal was completed |
| survey.submitted | Survey response received |
| segment.entered | User entered segment |
| segment.exited | User exited segment |
| error.occurred | Error captured |
| launcher.clicked | Launcher was clicked |

### Webhook Setup

1. Create a WalkMe Trigger node in your workflow
2. Copy the webhook URL provided
3. In WalkMe dashboard, go to Insights > Integrations
4. Configure a new webhook with the URL
5. Select the events to send

## Data Center Regions

| Region | API URL |
|--------|---------|
| US | https://api.walkme.com |
| EU | https://eu-api.walkme.com |
| FedRAMP | https://api.walkmegov.com |
| Canada | https://api-ca1.walkmedap.com |

## Error Handling

The node handles common WalkMe API errors:

| Code | Description |
|------|-------------|
| 400 | Bad Request - Invalid parameters |
| 401 | Unauthorized - Invalid or expired credentials |
| 403 | Forbidden - Insufficient permissions or scope |
| 404 | Not Found - Resource doesn't exist |
| 429 | Rate Limited - Too many requests |
| 500 | Server Error - WalkMe internal error |

Enable "Continue on Fail" in your workflow to handle errors gracefully.

## Development

```bash
# Install dependencies
npm install

# Run linting
npm run lint

# Run tests
npm test

# Build the project
npm run build

# Watch mode for development
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
Use of this node within any SaaS, PaaS, hosted platform, managed service,
or paid automation offering requires a commercial license.

For licensing inquiries:
**licensing@velobpa.com**

See [LICENSE](LICENSE), [COMMERCIAL_LICENSE.md](COMMERCIAL_LICENSE.md), and [LICENSING_FAQ.md](LICENSING_FAQ.md) for details.

## Support

- **Documentation**: [WalkMe Developer Portal](https://developer.walkme.com)
- **Issues**: [GitHub Issues](https://github.com/Velocity-BPA/n8n-nodes-walkme/issues)
- **Commercial Support**: [licensing@velobpa.com](mailto:licensing@velobpa.com)

## Acknowledgments

- [WalkMe](https://www.walkme.com) for their comprehensive API platform
- [n8n](https://n8n.io) for the workflow automation platform
- The n8n community for inspiration and best practices
