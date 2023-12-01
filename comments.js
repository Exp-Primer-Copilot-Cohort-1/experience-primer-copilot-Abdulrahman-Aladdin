// Create web server

// 1. Load modules
const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');

// 2. Create web server
const app = http.createServer((request, response) => {
    // 2.1 Get request url
    const _url = request.url;
    const queryData = url.parse(_url, true).query;
    const pathname = url.parse(_url, true).pathname;

    // 2.2 Get method
    const method = request.method;

    // 2.3 Get data
    let body = '';
    request.on('data', (data) => {
        body += data;
    });

    request.on('end', () => {
        const post = qs.parse(body);

        // 2.4 Response
        if (pathname === '/') {
            if (method === 'GET') {
                fs.readFile('index.html', (error, data) => {
                    if (error) {
                        throw error;
                    }
                    response.writeHead(200, {'Content-Type': 'text/html'});
                    response.end(data);
                });
            } else if (method === 'POST') {
                fs.readFile('index.html', (error, data) => {
                    if (error) {
                        throw error;
                    }
                    response.writeHead(200, {'Content-Type': 'text/html'});
                    response.end(data);
                });
            }
        } else if (pathname === '/create_process') {
            const title = post.title;
            const description = post.description;
            fs.writeFile(`data/${title}`, description, 'utf8', (error) => {
                response.writeHead(302, {Location: `/?id=${title}`});
                response.end();
            });
        } else if (pathname === '/update') {
            fs.readFile(`data/${queryData.id}`, 'utf8', (error, data) => {
                const title = queryData.id;
                const description = data;
                const template = `
                    <!doctype html>
                    <html>
                    <head>
                        <title>WEB1 - Create</title>
                        <meta charset="utf-8">
                    </head>
                    <body>
                        <h1><a href="/">WEB</a></h1>
                        <ol>
                            <li><a href="/?id=HTML">HTML</a></li>
                            <li><a href