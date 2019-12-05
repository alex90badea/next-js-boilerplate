const next = require('next');
const routes = require('../routes');
const https = require('https');
const fs = require('fs');
const {parse} = require('url');
const express = require('express');

const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = routes.getRequestHandler(app);




const options = {
    key: fs.readFileSync('private/key.pem'),
    cert: fs.readFileSync('private/cert.pem')
};

app.prepare()
    .then(() => {
        const server = express();

        server.get('*', (req, res) => {
            return handle(req, res);
        });

        var httpsServer = https.createServer(options, server);

        httpsServer.listen(8000, err => {
            if (err) throw err;
            console.log('> Ready on https://localhost:8000');
        });
    })
.catch(ex => {
        console.error(ex.stack);
        process.exit(1);
    });
//
// app.prepare()
//     .then(() => {
//         https
//             .createServer(options, (req, res) => {
//                 // Be sure to pass `true` as the second argument to `url.parse`.
//                 // This tells it to parse the query portion of the URL.
//                 const parsedUrl = parse(req.url, true);
//                 const { pathname, query } = parsedUrl;
//
//                 if (pathname === '/api/v1/auth/twitter/reverse') {
//                     return res.json(twitter_api.request_token(req, res));
//                 }
//
//                 handle(req, res, parsedUrl);
//             })
//             .listen(8000, err => {
//                 if (err) throw err;
//                 console.log('> Ready on https://localhost:8000')
//             })
//     }).catch(ex => {
//     console.error(ex.stack);
//     process.exit(1);
// });
