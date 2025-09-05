import * as http from 'node:http'
import * as fs from 'node:fs/promises';


const server = http.createServer(async (req, res) => {
    console.log('Requested URL:', req.url);
    let filePath;

    switch (req.url) {
        case '/':
            filePath = './index.html';
            break;
        case '/about':
            filePath = './about.html';
            break;
        case '/contact-me':
            filePath = './contact_me.html';
            break;
        default:
            filePath = './404.html';
    }

    try {
        const data = await fs.readFile(filePath, 'utf8');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    } 
    catch (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Server Error');
        console.error(err);
    }
});

server.listen(8080, () => {
    console.log('Server running at http://localhost:8080/');
});