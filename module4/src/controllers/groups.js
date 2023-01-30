const express = require('express');
const { Op } = require('sequelize');
const uuid = require('uuid');
const httpStatusCodes = require('../config/httpStatusCodes');
const Group = require('../models/group');

const api = express.Router();

api.get('/getAllGroups', (req, res) => {
    Group.findAll()
    .then(data => {
        res.status(httpStatusCodes.OK).send(data);
    })
    .catch(error => {
        const { message } = error;
        res.status(httpStatusCodes.BAD_REQUEST).send(message);
    });
});

api.get('/getGroupById', (req, res) => {
    const { id: groupId } = req.query;
    Group.findOne({
        where: {
            id: groupId
        }
    }).then(data => {
        if (data) {
            res.status(httpStatusCodes.OK).send(data);
        } else {
            res.status(httpStatusCodes.OK).send('No group with requested id');
        }
    })
    .catch(error => {
        const { message } = error;
        res.status(httpStatusCodes.BAD_REQUEST).send(message);
    });
});

api.delete('/deleteGroupById', async (req, res) => {
    const { id: groupId } = req.query;
    
    await Group.destroy(
        {
          where: {
            id: groupId
          },
        }
      ).then(data => {
          if (data) {
            res.status(httpStatusCodes.OK).send(`Group with id ${groupId} was successfully deleted!!!`);
          } else {
            res.status(httpStatusCodes.OK).send(`No group with requested id ${userId}`);
          }
      }).catch(error => {
          const { message } = error;
          res.status(httpStatusCodes.BAD_REQUEST).send(message);
      });
});

api.post('/addGroup', async (req, res) => {
    const group = req.body;

    await Group.create({
        ...group,
        id: uuid.v4(),
    }).then(data => {
        res.status(httpStatusCodes.OK).json({ message: 'Group successfully created!!!', data });
    }).catch(error => {
        const { message } = error;
        res.status(httpStatusCodes.BAD_REQUEST).send(`Failed to create group: ${message}`);
    });
});

api.put('/updateGroupById', async (req, res) => {
    const { id: groupId } = req.query;
    const groupInfo = req.body;

    console.log(groupInfo.permissions);

    await Group.update(
        { ...groupInfo },
        {
          where: {
            id: groupId
          },
        }
      ).then(data => {
          if (data) {
            res.status(httpStatusCodes.OK).send(`Group with id ${groupId} was successfully updated!!!`);
          } else {
            res.status(httpStatusCodes.OK).send(`No group with requested id ${groupId}`);
          }
      }).catch(error => {
          const { message } = error;
          res.status(httpStatusCodes.BAD_REQUEST).send(`Failed to update group: ${message}`);
      });
});

module.exports = api;
