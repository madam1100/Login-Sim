const express = require('express');
const app = express();

app.get('/hello', (req, res) => {
    res.send('Hello from backend!');
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:${PORT}');
}); 

const http = require('http');

const PORT = 3001;

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World');
});

server.listen(PORT, () => {
    console.log('Server running on http://localhost:${PORT}');
});