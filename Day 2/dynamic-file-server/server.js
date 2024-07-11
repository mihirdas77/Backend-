const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const BASE_DIR = __dirname;

const icons = {
  folder: '📁',
  file: '📄'
};

// Utility function to generate HTML for directory listing
const generateDirectoryListing = (dirPath, relativePath) => {
  const items = fs.readdirSync(dirPath);
  let html = '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Directory Listing</title></head><body>';
  html += `<h1>Directory Listing for ${relativePath}</h1>`;
  html += '<ul>';

  if (relativePath !== '/') {
    const parentPath = path.join(relativePath, '..');
    html += `<li>${icons.folder} <a href="${parentPath}">..</a></li>`;
  }

  items.forEach(item => {
    const itemPath = path.join(dirPath, item);
    const itemRelativePath = path.join(relativePath, item);
    const stat = fs.statSync(itemPath);
    if (stat.isDirectory()) {
      html += `<li>${icons.folder} <a href="${itemRelativePath}/">${item}</a></li>`;
    } else {
      html += `<li>${icons.file} <a href="${itemRelativePath}">${item}</a></li>`;
    }
  });

  html += '</ul></body></html>';
  return html;
};

// Request handler
const requestHandler = (req, res) => {
  const requestedPath = path.join(BASE_DIR, decodeURIComponent(req.url));
  if (!fs.existsSync(requestedPath)) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
    return;
  }

  const stat = fs.statSync(requestedPath);

  if (stat.isDirectory()) {
    const html = generateDirectoryListing(requestedPath, req.url);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
  } else {
    fs.readFile(requestedPath, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
        return;
      }

      const ext = path.extname(requestedPath).slice(1);
      const contentType = {
        'html': 'text/html',
        'js': 'application/javascript',
        'css': 'text/css',
        'json': 'application/json',
        'png': 'image/png',
        'jpg': 'image/jpeg',
        'gif': 'image/gif',
        'txt': 'text/plain'
      }[ext] || 'application/octet-stream';

      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    });
  }
};

// Create the server
const server = http.createServer(requestHandler);

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
