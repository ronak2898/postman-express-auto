const express = require('express');
const { postmanAuto } = require('./dist');

const app = express();
app.use(postmanAuto({
  output: './quick-test.postman_collection.json',
  collectionName: 'Quick Test',
  baseUrl: 'http://localhost:3003'
}));

app.get('/api/test', (req, res) => res.json({ ok: true }));
app.post('/api/users', (req, res) => res.json({ id: 1 }));

const server = app.listen(3003, () => {
  require('http').get('http://localhost:3003/api/test', () => {
    setTimeout(() => {
      const fs = require('fs');
      if (fs.existsSync('./quick-test.postman_collection.json')) {
        console.log('✅ Test passed - collection generated with updated dependencies');
        fs.unlinkSync('./quick-test.postman_collection.json');
      }
      server.close();
      process.exit(0);
    }, 500);
  });
});
