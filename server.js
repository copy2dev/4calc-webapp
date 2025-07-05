const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  let filePath = '';
  
  if (req.url === '/' || req.url === '/index.html') {
    filePath = path.join(__dirname, 'index.html');
  } else if (req.url === '/test') {
    filePath = path.join(__dirname, 'test-preview.html');
  } else {
    res.writeHead(404);
    res.end('Page not found');
    return;
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end('Server error');
      return;
    }

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(content);
  });
});

const PORT = 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 4Calc Server running at:`);
  console.log(`   Local:    http://localhost:${PORT}`);
  console.log(`   Network:  http://0.0.0.0:${PORT}`);
  console.log(`\n📄 Available pages:`);
  console.log(`   Main:     http://localhost:${PORT}/`);
  console.log(`   Test:     http://localhost:${PORT}/test`);
  console.log(`\nPress Ctrl+C to stop`);
});