/*eslint-disable no-console */
import express from 'express';
import path from 'path';
import open from 'open';

const port = 8080;
const app = express();

app.use('/dist', express.static('dist'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/home.html'));
});

app.listen(port, (err) => {
    if (err) {
        console.error(err);
    }
    else {
        open(`http://localhost:${port}`);
    }
});