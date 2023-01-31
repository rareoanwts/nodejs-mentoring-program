const express = require('express');
const httpStatusCodes = require('../config/httpStatusCodes');
const User = require('../models/user');
const { createUser, deleteUser, getUser, getUsers, updateUser } = require('../services/users');
const { addUsersToGroup, deleteRecord } = require('../services/userGroup');

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
    }
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
            res.status(httpStatusCodes.OK).send(message)
        }
    }
});

api.delete('/deleteUserById', async (req, res) => {
    const { id: userId } = req.query;

    const result = await deleteUser(userId);

    if (result.error) {
        const { message } = result.error;
        res.status(httpStatusCodes.BAD_REQUEST).send(message);
    } else {
        const { data, message } = result;
        if (!data) {
            res.status(httpStatusCodes.OK).send(message);
        } else {
            const { error: deleteRecordError } = await deleteRecord({ userId });
            if (deleteRecordError) {
                res.status(httpStatusCodes.BAD_REQUEST).send(deleteRecordError.message);
            } else {
                res.status(httpStatusCodes.OK).send(message);
            }
        }
    }
});

api.post('/addUser', async (req, res) => {
        const user = req.body;

        const result = await createUser(user);

        if (result.error) {
          const { message } = error;
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
        res.status(httpStatusCodes.OK).send(result.message);
    };
});

api.post('/addUsersToGroup', async (req, res) => {
    const { users, groupId } = req.body;

    const response = await addUsersToGroup(users, groupId);

    if (response.error) {
        res.status(httpStatusCodes.BAD_REQUEST).send(`Failed to add users to group: ${response.message}`);
    } else {
        res.status(httpStatusCodes.OK).send('Users were successfully added to the group!!!');
    }
});

module.exports =  api;