// const express = require('express');
// const app = express();

// app.get('/hello', (req, res) => {
//     res.send('Hello from backend!');
// });

// app.listen(3000, () => {
//     console.log('Server running on http://localhost:${PORT}');
// }); 

// const http = require('http');

// const PORT = 3001;

// const server = http.createServer((req, res) => {
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.end('Hello World');
// });

// server.listen(PORT, () => {
//     console.log('Server running on http://localhost:${PORT}');
// });

const http2 = require('http');
const fs = require('fs');
const querystring = require('querystring');
const PORT2 = 3002;
const VALID_USER = 'admin';
const VALID_PASS = '1234';
const simServer = http2.createServer((req, res) => {
    if(req.method === 'GET' && req.url === '/') {
        fs.readFile('login.html', (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading HTML');
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data);
            }
        });
    }
    else if (req.method === 'POST' && req.url === '/login') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const formData = querystring.parse(body);
            const {username, password} = formData;
            if (username === VALID_USER && password === VALID_PASS) {
                res.writeHead(200, { 'Content-Type': 'text/html'});
                res.end(`
                    <h2>Login successful welcome ${username}!</h2>
                    <a href="/">Go back to Login</a>
                `);
            } else {
                res.writeHead(401, { 'Content-Type': 'text/html'});
                res.end('<h2>Login failed. Invalid credentials.</h2><a href="/">Go back to Login</a>');
            }
        });
    }
    else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

simServer.listen(PORT2, () => {
    console.log(`Server running at http://localhost:${PORT2}`);
});