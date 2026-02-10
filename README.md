# 📮 postman-express-auto

> Auto-generate Postman collections from your Express.js routes with **zero configuration** and **realistic dummy data**.

[![npm version](https://img.shields.io/npm/v/postman-express-auto.svg)](https://www.npmjs.com/package/postman-express-auto)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- 🚀 **Zero Config** - One line of code to get started
- 📁 **Smart Folder Structure** - Auto-organizes routes into folders
- 🎲 **Realistic Dummy Data** - Uses Faker.js for intelligent data generation
- ☁️ **Postman Cloud Sync** - Auto-upload to your Postman workspace
- 🔄 **Auto-Reload** - Updates collection on route changes
- 📝 **TypeScript Support** - Full type safety included
- 🎯 **Framework Agnostic** - Works with Express, and more coming soon

## 📦 Installation

```bash
npm install postman-express-auto
```

## 🚀 Quick Start

```typescript
import express from 'express';
import { postmanAuto } from 'postman-express-auto';

const app = express();
app.use(express.json());

// Add ONE line 👇
app.use(postmanAuto({
  output: './postman_collection.json',
  collectionName: 'My API'
}));

// Define your routes normally
app.get('/api/users', (req, res) => {
  res.json([]);
});

app.post('/api/users', (req, res) => {
  res.json({ id: 1, ...req.body });
});

app.listen(3000);
```

**That's it!** 🎉 

Your Postman collection is automatically generated at `postman_collection.json`

## 📖 API Reference

### `postmanAuto(options)`

#### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `output` | `string` | `'./postman_collection.json'` | Output file path |
| `collectionName` | `string` | `'API Collection'` | Name of the collection |
| `baseUrl` | `string` | `'http://localhost:3000'` | Base URL for requests |
| `postmanApiKey` | `string` | `undefined` | Postman API key for cloud sync |
| `collectionId` | `string` | `undefined` | Existing collection ID to update |
| `autoSync` | `boolean` | `false` | Auto-sync on route changes |
| `debug` | `boolean` | `false` | Enable debug logging |

### Example with All Options

```typescript
app.use(postmanAuto({
  output: './my-api.postman_collection.json',
  collectionName: 'My Complete API',
  baseUrl: 'https://api.myapp.com',
  postmanApiKey: process.env.POSTMAN_API_KEY,
  collectionId: 'your-collection-id',
  autoSync: true,
  debug: true
}));
```

## 🎯 Generated Collection Structure

For these routes:
```
GET  /api/users
POST /api/users
GET  /api/users/:id
POST /api/posts
GET  /api/posts/:postId/comments
```

Generates this Postman structure:
```
📁 My API
  📁 api
    📁 users
      📄 GET /api/users
      📄 POST /api/users
      📄 GET /api/users/:id
    📁 posts
      📄 POST /api/posts
      📁 :postId
        📁 comments
          📄 GET /api/posts/:postId/comments
```

## 🎲 Dummy Data Generation

The package intelligently generates realistic data based on route paths:

### User Routes (`/api/users`)
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "age": 28,
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "country": "USA",
    "zipCode": "10001"
  }
}
```

### Post Routes (`/api/posts`)
```json
{
  "title": "Introduction to Express.js",
  "content": "Lorem ipsum dolor sit amet...",
  "tags": ["express", "nodejs", "tutorial"],
  "published": true
}
```

### Product Routes (`/api/products`)
```json
{
  "name": "Ergonomic Keyboard",
  "description": "High-quality mechanical keyboard",
  "price": 129.99,
  "category": "Electronics",
  "inStock": true
}
```

## ☁️ Postman Cloud Sync

Sync your collection directly to Postman Cloud:

1. Get your API key from [Postman Settings](https://web.postman.co/settings/me/api-keys)
2. Get your collection ID from Postman (or create a new one)
3. Use in your code:

```typescript
app.use(postmanAuto({
  postmanApiKey: 'your-api-key',
  collectionId: 'your-collection-id',
  autoSync: true
}));
```

Now every time you start your server, the collection updates automatically!

## 📚 Examples

Check out the [`examples/`](./examples) directory:
- [`basic.ts`](./examples/basic.ts) - Simple API with CRUD operations
- [`advanced.ts`](./examples/advanced.ts) - Nested routes and complex structure

Run examples:
```bash
npm run example
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

MIT © [ronak2898](https://github.com/ronak2898)

## 🙏 Acknowledgments

- [Postman Collection SDK](https://github.com/postmanlabs/postman-collection)
- [Faker.js](https://fakerjs.dev/)
- All contributors and users of this package

## 📬 Support

- 🐛 [Report a bug](https://github.com/ronak2898/postman-express-auto/issues)
- 💡 [Request a feature](https://github.com/ronak2898/postman-express-auto/issues)
- ⭐ Star this repo if you find it helpful!

---

Made with ❤️ by [ronak2898](https://github.com/ronak2898)
