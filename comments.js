// Create web server
// Create comments.js file
// Create new comment

const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');

const server = http.createServer((req, res) => {
  const path = url.parse(req.url, true).pathname;
  const query = url.parse(req.url, true).query;

  if (req.method === 'GET') {
    if (path === '/') {
      fs.readFile('./index.html', (err, data) => {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      });
    } else if (path === '/comments') {
      fs.readFile('./comments.json', (err, data) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(data);
      });
    }
  } else if (req.method === 'POST') {
    if (path === '/comments') {
      let body = '';
      req.on('data', (data) => {
        body += data;
      });
      req.on('end', () => {
        const post = qs.parse(body);
        fs.readFile('./comments.json', (err, data) => {
          const comments = JSON.parse(data);
          comments.push(post);
          fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
            res.writeHead(201, { 'Content-Type': 'text/plain' });
            res.end('Data added');
          });
        });
      });
    }
  }
});

server.listen(8080, () => {
  console.log('Server is running on http://localhost:8080');
});

// Run the server and open the browser
// Open the browser and go to http://localhost:8080
// Open the browser console
// Type the following code to create a new comment
// fetch('/comments', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/x-www-form-urlencoded',
//   },
//   body: 'name=John&message=Hello',
// });