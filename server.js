const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  console.log(`Request: ${req.method} ${req.url}`);

  // Download endpoint
  if (req.url === '/download/Dhiva-Pet-Setup-1.0.0.exe' || req.url === '/Dhiva-Pet-Setup-1.0.0.exe') {
    const filePath = path.join(__dirname, 'Dhiva-Pet-Setup-1.0.0.exe');

    if (!fs.existsSync(filePath)) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('File not found');
      return;
    }

    const stat = fs.statSync(filePath);

    res.writeHead(200, {
      'Content-Type': 'application/octet-stream',
      'Content-Length': stat.size,
      'Content-Disposition': 'attachment; filename="Dhiva-Pet-Setup-1.0.0.exe"'
    });

    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
    return;
  }

  // Homepage
  if (req.url === '/' || req.url === '/index.html') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <html>
        <head><title>Dhiva Pet Downloads</title></head>
        <body style="font-family: sans-serif; background: #0f1220; color: #fff; padding: 40px; text-align: center;">
          <h1>🐒 Dhiva Pet</h1>
          <p>A playful desktop companion for Windows</p>
          <a href="/download/Dhiva-Pet-Setup-1.0.0.exe" 
             style="display: inline-block; padding: 14px 28px; background: linear-gradient(135deg, #ffb547, #ff7a59); color: #1a1204; text-decoration: none; border-radius: 12px; font-weight: bold; margin-top: 20px;">
            Download for Windows
          </a>
        </body>
      </html>
    `);
    return;
  }

  // 404
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not found');
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Download URL: http://localhost:${PORT}/download/Dhiva-Pet-Setup-1.0.0.exe`);
});
