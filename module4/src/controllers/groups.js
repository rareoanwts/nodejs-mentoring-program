const express = require('express');
const httpStatusCodes = require('../config/httpStatusCodes');
const { getAllGroups, getGroup, deleteGroup, createGroup, updateGroup } = require('../services/groups');
const { deleteRecord } = require('../services/userGroup');

const api = express.Router();

api.get('/getAllGroups', async (req, res) => {
    const result = await getAllGroups();

    if (result.error) {
        const { message } = result.error;
        res.status(httpStatusCodes.BAD_REQUEST).send(message);
    } else {
        const { data } = result;
        res.status(httpStatusCodes.OK).send(data);
    }
});

api.get('/getGroupById', async (req, res) => {
    const { id: groupId } = req.query;

    const result = await getGroup(groupId);

    if (result.error) {
        const { message } = result.error;
        res.status(httpStatusCodes.BAD_REQUEST).send(message);
    } else {
        if (result.data) {
            res.status(httpStatusCodes.OK).send(result.data);
        } else {
            res.status(httpStatusCodes.OK).send(result.message);
        }
    }
});

api.delete('/deleteGroupById', async (req, res) => {
    const { id: groupId } = req.query;

    const result = await deleteGroup(groupId);

    if (result.error) {
        const { message } = result.error;
        res.status(httpStatusCodes.BAD_REQUEST).send(message);
    } else {
        const { error } = await deleteRecord({ groupId });
        if (error) {
            res.status(httpStatusCodes.BAD_REQUEST).send(error.message);
        } else {
            const { message } = result;
            res.status(httpStatusCodes.OK).send(message);
        }
    }
});

api.post('/addGroup', async (req, res) => {
    const group = req.body;

    const result = await createGroup(group);

    if (result.error) {
        const { message } = result.error;
        res.status(httpStatusCodes.BAD_REQUEST).send(message);
    } else {
        // result: { data, message }
        res.status(httpStatusCodes.OK).json(result);
    };
});

api.put('/updateGroupById', async (req, res) => {
    const { id: groupId } = req.query;
    const groupInfo = req.body;

    const result = await updateGroup(groupId, groupInfo);

    if (result.error) {
        const { message } = result.error;
        res.status(httpStatusCodes.BAD_REQUEST).send(`Failed to update group: ${message}`);
    } else {
        res.status(httpStatusCodes.OK).send(result.message);
    }
});

module.exports = api;
