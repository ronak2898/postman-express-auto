const express = require('express');
const { postmanAuto } = require('./dist/index.js');

const app = express();
app.use(express.json());

app.use(postmanAuto({
  output: './advanced-test.postman_collection.json',
  collectionName: 'Advanced Test API',
  baseUrl: 'http://localhost:3001',
  debug: true
}));

// Products API
app.get('/api/products', (req, res) => res.json([]));
app.post('/api/products', (req, res) => res.json({ id: 1, ...req.body }));
app.get('/api/products/:id', (req, res) => res.json({ id: req.params.id }));

// Orders API with nested routes
app.get('/api/orders', (req, res) => res.json([]));
app.post('/api/orders', (req, res) => res.json({ id: 1, ...req.body }));
app.get('/api/orders/:orderId/items', (req, res) => res.json([]));
app.post('/api/orders/:orderId/items', (req, res) => res.json({ id: 1, ...req.body }));

// Posts with comments
app.get('/api/posts/:postId/comments', (req, res) => res.json([]));
app.post('/api/posts/:postId/comments', (req, res) => res.json({ id: 1, ...req.body }));

const server = app.listen(3001, () => {
  console.log('Advanced test server started');
  
  setTimeout(() => {
    const http = require('http');
    http.get('http://localhost:3001/api/products', (res) => {
      console.log('Request completed');
      setTimeout(() => {
        server.close(() => {
          console.log('Server closed');
          process.exit(0);
        });
      }, 500);
    });
  }, 500);
});
