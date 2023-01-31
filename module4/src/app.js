const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const httpStatusCodes = require('./config/httpStatusCodes');
const sequelize = require('./sequelize');
const { userRouter, groupRouter } = require('./controllers');
const { PORT } = require('./config/variables');

const app = express();

app.use(bodyParser.json());

app.use('/users', userRouter);
app.use('/groups', groupRouter);

app.use((req, res) => {
    res.status(httpStatusCodes.NOT_FOUND).send('Not Found');
});

sequelize
.authenticate()
.then(() => {
    console.log('Connection has been established successfully');
    http.createServer(app).listen(PORT, () => {
        console.log(`Running on port ${PORT}...`);
    });
})
.catch(err => {
    console.error('Unable to connect to the database.', err);
});
