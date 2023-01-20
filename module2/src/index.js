const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const userRouter = require('./userRouter');
const httpStatusCodes = require('./httpStatusCodes');

require('./global');

const app = express();

app.use(bodyParser.json());

app.use('/users', userRouter);

app.use((req, res) => {
    res.status(httpStatusCodes.NOT_FOUND).send('Not Found');
});

http.createServer(app).listen(8000, () => {
    console.log('Running on port 8000...');
});
