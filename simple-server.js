const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  let filePath = '';
  
  if (req.url === '/' || req.url === '/index.html') {
    filePath = path.join(__dirname, 'test-preview.html');
  } else {
    filePath = path.join(__dirname, req.url);
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end('File not found');
      return;
    }

    const ext = path.extname(filePath);
    let contentType = 'text/html';
    
    if (ext === '.css') contentType = 'text/css';
    if (ext === '.js') contentType = 'text/javascript';
    
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});