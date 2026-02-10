import express from 'express';
import { postmanAuto } from '../src';

const app = express();
app.use(express.json());

app.use(postmanAuto({
  output: './advanced-api.postman_collection.json',
  collectionName: 'Advanced API with Nested Routes',
  baseUrl: 'http://localhost:3000'
}));

// Products API
app.get('/api/products', (req, res) => res.json([]));
app.post('/api/products', (req, res) => res.json({ id: 1, ...req.body }));
app.get('/api/products/:id', (req, res) => res.json({ id: req.params.id }));

// Orders API
app.get('/api/orders', (req, res) => res.json([]));
app.post('/api/orders', (req, res) => res.json({ id: 1, ...req.body }));
app.get('/api/orders/:orderId', (req, res) => res.json({ id: req.params.orderId }));

// Nested: Order Items
app.get('/api/orders/:orderId/items', (req, res) => res.json([]));
app.post('/api/orders/:orderId/items', (req, res) => res.json({ id: 1, ...req.body }));

// Admin routes
app.get('/api/admin/users', (req, res) => res.json([]));
app.get('/api/admin/settings', (req, res) => res.json({}));

app.listen(3000, () => {
  console.log('Server with nested routes running on http://localhost:3000');
});
