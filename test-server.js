const express = require('express');
const { postmanAuto } = require('./dist/index.js');

const app = express();
app.use(express.json());

// Add postman-express-auto middleware
app.use(postmanAuto({
  output: './test-api.postman_collection.json',
  collectionName: 'Test API',
  baseUrl: 'http://localhost:3000',
  debug: true
}));

// Define routes
app.get('/api/users', (req, res) => {
  res.json([{ id: 1, name: 'John Doe' }]);
});

app.post('/api/users', (req, res) => {
  res.json({ id: 1, ...req.body });
});

app.get('/api/users/:id', (req, res) => {
  res.json({ id: req.params.id, name: 'John Doe' });
});

const server = app.listen(3000, () => {
  console.log('Server started on port 3000');
  
  // Make a request to trigger the middleware
  setTimeout(() => {
    const http = require('http');
    http.get('http://localhost:3000/api/users', (res) => {
      console.log('Request completed with status:', res.statusCode);
      setTimeout(() => {
        server.close(() => {
          console.log('Server closed');
          process.exit(0);
        });
      }, 500);
    });
  }, 500);
});
