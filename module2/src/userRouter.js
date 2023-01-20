const express = require('express');
const uuid = require('uuid');
const { getAutoSuggestUsers, getUserById } = require('./utils');
const httpStatusCodes = require('./httpStatusCodes');
const validate = require('./validation/middleware');

const api = express.Router();

api.get('/list', (req, res) => {
    const { limit = 10, filter = '' } = req.query;
    const usersToSend = getAutoSuggestUsers(filter, limit);

    res.status(httpStatusCodes.OK).send(usersToSend);
});

api.get('/getUserById', (req, res) => {
    const { id: userId } = req.query;
    const user = getUserById(userId);
    if (user) {
        res.status(httpStatusCodes.OK).send(user);
    }
    res.status(httpStatusCodes.OK).send('No user with requested id');
});

api.delete('/deleteUserById', (req, res) => {
    const { id: userId } = req.query;
    const user = getUserById(userId);

    if (user) {
        user.isDeleted = true;
        res
            .status(httpStatusCodes.OK)
            .json({
                message: `User with id ${userId} was successfully deleted!!!`,
                data: user
            });
    }
    res
        .status(httpStatusCodes.OK)
        .send('No user with requested id');
});

api.post('/addUser',
    (req, _, next) => {
        const user = req.body;

        user.id = uuid.v4();
        user.isDeleted = false;

        req.body = user;

        next();
    },
    validate,
    (req, res) => {
        const user = req.body;
        global.users.push(user);

        res
            .status(httpStatusCodes.OK)
            .json({ message: 'User successfully created!!!', data: user });
    }
);

api.put('/updateUserById',
    (req, res, next) => {
        const { id: userId } = req.query;
        const userInfo = req.body;
        const user = getUserById(userId);

        if (!user) {
            res.status(httpStatusCodes.OK).send('No user with requested id');
        }

        req.body = { ...user, ...userInfo };

        next();
    },
    validate,
    (req, res) => {
        const updatedUser = req.body;

        global.users = global.users.map(user => {
            const { id } = user;

            if (id === updatedUser.id) {
                return updatedUser;
            }

            return user;
        });
        res.status(httpStatusCodes.OK).send('User was successfully updated!!!');
    }
);

module.exports =  api;
