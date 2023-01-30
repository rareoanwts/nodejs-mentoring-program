const express = require('express');
const httpStatusCodes = require('../config/httpStatusCodes');
const {
    createUser,
    deleteUser,
    getUser,
    getUsers,
    updateUser
} = require('../services');

const api = express.Router();

api.get('/list', async (req, res) => {
    const { limit = 10, filter = '' } = req.query;

    const result = await getUsers(limit, filter);

    if (result.error) {
        const { message } = result.error;
        res.status(httpStatusCodes.BAD_REQUEST).send(message);
    } else {
        const { data } = result;
        res.status(httpStatusCodes.OK).send(data);
    };
});

api.get('/getUserById', async (req, res) => {
    const { id: userId } = req.query;

    const result = await getUser(userId);

    if (result.error) {
        const { message } = result.error;
        res.status(httpStatusCodes.BAD_REQUEST).send(message);
    } else {
        const { data, message } = result;
        if (data) {
            res.status(httpStatusCodes.OK).send(data);
        } else {
            res.status(httpStatusCodes.OK).send(message);
        }
    };
});

api.delete('/deleteUserById', async (req, res) => {
    const { id: userId } = req.query;

    const result = await deleteUser(userId);

    if (result.error) {
        const { message } = result.error;
        res.status(httpStatusCodes.BAD_REQUEST).send(message);
    } else {
        const { message } = result;
        res.status(httpStatusCodes.OK).send(message);
    };
});

api.post('/addUser', async (req, res) => {
        const user = req.body;

        const result = await createUser(user);

        if (result.error) {
          const { message } = result.error;
          res.status(httpStatusCodes.BAD_REQUEST).send(`Failed to create user: ${message}`);
        } else {
            res.status(httpStatusCodes.OK).json(result);
        };
    }
);

api.put('/updateUserById', async (req, res) => {
    const { id: userId } = req.query;
    const userInfo = req.body;

    const result = await updateUser(userId, userInfo);

    if (result.error) {
        const { message } = result.error;
        res.status(httpStatusCodes.BAD_REQUEST).send(`Failed to update user: ${message}`);
    } else {
        const { message } = result;
        res.status(httpStatusCodes.OK).send(message);
    };
});

module.exports =  api;
