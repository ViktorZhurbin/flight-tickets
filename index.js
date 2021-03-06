const express = require('express');
const path = require('path');
const expressStaticGzip = require('express-static-gzip');
const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.header('Cache-Control', 'max-age=31536000');
    next();
});

app.use(
    '/',
    expressStaticGzip(path.join(__dirname, 'client/build'), {
        enableBrotli: true,
        orderPreference: ['br']
    })
);

app.use(require('./server/routes/tickets'));
app.use(require('./server/routes/currency'));

const port = process.env.PORT || 5000;
const server = app.listen(port, () =>
    console.log(`Listening on port ${port}!`)
);

process.on('SIGTERM', () => {
    console.info('SIGTERM signal received.');
    console.log('Closing http server.');
    server.close(() => {
        console.log('Http server closed.');
    });
});

process.on('uncaughtException', () => {
    console.info('uncaughtException signal received.');
    console.log('Closing http server.');
    server.close(() => {
        console.log('Http server closed.');
    });
});
