const express = require('express');
const uuid = require('uuid');
const httpStatusCodes = require('../config/httpStatusCodes');
const UserGroup = require('../models/userGroup');

const api = express.Router();

api.get('/addUsersToGroup', (req, res) => {
    const { userList, groupId: groupid } = req.body;

    const rowsToAdd = userList.map(userid => ({
        id: uuid.v4(),
        userid,
        groupid,
    }));

    UserGroup.bulkCreate(rowsToAdd)
    .then(data => {
        res.status(httpStatusCodes.OK).send(data);
    })
    .catch(error => {
        const { message } = error;
        res.status(httpStatusCodes.BAD_REQUEST).send(message);
    });
});


module.exports = api;
