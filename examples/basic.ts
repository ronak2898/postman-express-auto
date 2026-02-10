import express from 'express';
import { postmanAuto } from '../src';

const app = express();
app.use(express.json());

// 🔥 Add postman-express-auto middleware
app.use(postmanAuto({
  output: './my-api.postman_collection.json',
  collectionName: 'My Basic API',
  baseUrl: 'http://localhost:3000',
  debug: true
}));

// Define your routes
app.get('/api/users', (req, res) => {
  res.json([{ id: 1, name: 'John Doe', email: 'john@example.com' }]);
});

app.post('/api/users', (req, res) => {
  res.json({ id: 1, ...req.body, createdAt: new Date().toISOString() });
});

app.get('/api/users/:id', (req, res) => {
  res.json({ id: req.params.id, name: 'John Doe', email: 'john@example.com' });
});

app.put('/api/users/:id', (req, res) => {
  res.json({ id: req.params.id, ...req.body, updatedAt: new Date().toISOString() });
});

app.delete('/api/users/:id', (req, res) => {
  res.json({ message: 'User deleted successfully' });
});

// Posts API
app.get('/api/posts', (req, res) => {
  res.json([]);
});

app.post('/api/posts', (req, res) => {
  res.json({ id: 1, ...req.body });
});

app.get('/api/posts/:postId/comments', (req, res) => {
  res.json([]);
});

app.listen(3000, () => {
  console.log('✅ Server running on http://localhost:3000');
  console.log('📮 Check my-api.postman_collection.json');
});
