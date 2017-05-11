/*eslint-disable no-console */
import express from 'express';
import httpProxy from 'http-proxy';
import webpack from 'webpack';
import path from 'path';
import config from '../configs/webpack.config.dev.js';
import open from 'open';
import colors from 'colors';

const port = 8080;
const app = express();
const apiProxy = httpProxy.createProxyServer();
const compiler = webpack(config);

let webpackDevMiddlewareInstance = require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    quiet: true    // display nothing to the console
});
app.use(webpackDevMiddlewareInstance);

app.use(require('webpack-hot-middleware')(compiler));

app.use('/api/*', (req, res) => {
    req.url = req.baseUrl;  // URL
    apiProxy.web(req, res, {
        target: 'https://api.com:443'  // set a host what you want to use.
    });
});

app.use('*', (req, res, next) => {
    let filename = path.join(compiler.outputPath, 'home.html');
    compiler.outputFileSystem.readFile(filename, (err, result) => {
        if (err) {
            return next(err);
        }
        res.set('content-type', 'text/html');
        res.send(result);
        res.end();
    });
});

app.listen(port, (err) => {
    if (err) {
        console.error(err);
    }
    else {
        webpackDevMiddlewareInstance.waitUntilValid(() => {
            open(`http://localhost:${port}`);
        });
    }
});