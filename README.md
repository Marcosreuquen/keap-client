# keap-client

[![npm version](https://badge.fury.io/js/keap-client.svg)](https://badge.fury.io/js/keap-client)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)

> **Note:** This library is currently under active development.

A modern TypeScript client for the [Keap/Infusionsoft REST API](https://developer.infusionsoft.com/docs/rest/). This library provides a simple, type-safe interface to interact with Keap's API, making it easier to integrate Keap functionality into your applications.

## Features

- 🚀 **TypeScript First** - Full type safety and IntelliSense support
- 🔄 **Auto-retry** - Configurable retry logic for failed requests
- ⏱️ **Timeout Control** - Customizable request timeouts
- 📦 **Modular Design** - Clean, organized API surface
- 🔒 **Secure** - Built-in API key authentication
- 📖 **Well Documented** - Comprehensive JSDoc comments

## Installation

```bash
npm install keap-client
```

```bash
yarn add keap-client
```

```bash
pnpm add keap-client
```

## Quick Start

```typescript
import { KeapClient } from 'keap-client';

// Initialize the client
const keap = new KeapClient({
  apiKey: 'your-api-key-here', // Required: Get this from your Keap app
  requestTimeout: 5000,        // Optional: Request timeout in milliseconds (default: 10000)
  retries: 3                   // Optional: Number of retry attempts (default: 0)
});

// Fetch a contact
const contact = await keap.Contact.getContact(123);
console.log(contact.email);

// Update contact information
await contact.update({ 
  email_opted_in: true,
  given_name: 'John',
  family_name: 'Doe' 
});

// Apply tags to contact
await contact.applyTags(['customer', 'newsletter-subscriber']);
```

## API Reference

### Client Configuration

```typescript
interface KeapClientOptions {
  apiKey: string;          // Your Keap API key (required)
  requestTimeout?: number; // Request timeout in milliseconds (optional)
  retries?: number;        // Number of retry attempts (optional)
}
```

### Available Models

#### ✅ Implemented
- **Account Info** - Retrieve account information
- **Contact** - Manage contacts and their data
- **E-Commerce** - Handle e-commerce related operations
- **Email** - Manage email communications
- **File** - File upload and management
- **Opportunity** - Sales opportunity tracking
- **Product** - Product catalog management
- **Tags** - Contact tagging system
- **Users** - User management

#### 🚧 Coming Soon
- Affiliate
- Appointment
- Campaign
- Company
- Email Address
- Locale
- Merchant
- Note
- REST Hooks
- Setting
- Task
- User Info

## Usage Examples

### Working with Contacts

```typescript
// Get a specific contact
const contact = await keap.Contact.getContact(123);

// Create a new contact
const newContact = await keap.Contact.createContact({
  given_name: 'Jane',
  family_name: 'Smith',
  email_addresses: [{
    email: 'jane@example.com',
    field: 'EMAIL1'
  }]
});

// List contacts with pagination
const contacts = await keap.Contact.listContacts({
  limit: 50,
  offset: 0
});

// Search contacts
const searchResults = await keap.Contact.listContacts({
  email: 'jane@example.com'
});
```

### Working with Products

```typescript
// Get all products
const products = await keap.Product.listProducts();

// Get a specific product
const product = await keap.Product.getProduct(456);

// Create a new product
const newProduct = await keap.Product.createProduct({
  product_name: 'My Product',
  product_price: 99.99,
  product_short_desc: 'A great product'
});
```

### Working with Tags

```typescript
// List all tags
const tags = await keap.Tags.listTags();

// Create a new tag
const tag = await keap.Tags.createTag({
  name: 'VIP Customer',
  description: 'High-value customers'
});

// Apply tags to a contact
await keap.Contact.getContact(123).then(contact => 
  contact.applyTags(['vip-customer', 'newsletter'])
);
```

## Error Handling

The client includes built-in error handling and retry logic:

```typescript
try {
  const contact = await keap.Contact.getContact(123);
} catch (error) {
  console.error('Failed to fetch contact:', error.message);
  // Handle the error appropriately
}
```

## Authentication

You'll need a Keap API key to use this library. You can obtain one by:

1. Logging into your Keap account
2. Going to Admin → Settings → Application Settings
3. Click on "API" in the left sidebar
4. Generate a new API key

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- 📖 [Keap API Documentation](https://developer.infusionsoft.com/docs/rest/)
- 🐛 [Report Issues](https://github.com/Marcosreuquen/keap-client/issues)
- 💬 [Discussions](https://github.com/Marcosreuquen/keap-client/discussions)

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a detailed list of changes and versions.

---

Developed by [Marcos Reuquen Diaz](https://marcosdiaz.dev)
