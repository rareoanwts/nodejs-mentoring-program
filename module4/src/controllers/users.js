const express = require('express');
const { Op } = require('sequelize');
const uuid = require('uuid');
const httpStatusCodes = require('../config/httpStatusCodes');
const User = require('../models/user');
const { addUsersToGroup } = require('../services/addUsersToGroup');

const api = express.Router();

api.get('/list', (req, res) => {
    const { limit = 10, filter = '' } = req.query;
    User.findAll({
        limit,
        where: {
            login: {
                [Op.like]: `%${filter}%`
            }
        }
    }).then(data => {
        res.status(httpStatusCodes.OK).send(data);
    })
    .catch(error => {
        const { message } = error;
        res.status(httpStatusCodes.BAD_REQUEST).send(message);
    });
});

api.get('/getUserById', (req, res) => {
    const { id: userId } = req.query;
    User.findOne({
        where: {
            id: userId,
            isdeleted: false
        }
    }).then(data => {
        if (data) {
            res.status(httpStatusCodes.OK).send(data);
        }

        res.status(httpStatusCodes.OK).send('No user with requested id');
    })
    .catch(error => {
        const { message } = error;
        res.status(httpStatusCodes.BAD_REQUEST).send(message);
    });
});

api.delete('/deleteUserById', async (req, res) => {
    const { id: userId } = req.query;
    
    await User.update(
        { isdeleted: true },
        {
          where: {
            id: userId,
            isdeleted: false
          },
        }
      ).then(data => {
          if (data && data[0]) {
            res.status(httpStatusCodes.OK).send(`User with id ${userId} was successfully deleted!!!`);
          } else {
            res.status(httpStatusCodes.OK).send(`No user with requested id ${userId}`);
          }
      }).catch(error => {
          const { message } = error;
          res.status(httpStatusCodes.BAD_REQUEST).send(message);
      });
});

api.post('/addUser', async (req, res) => {
        const user = req.body;

        await User.create({
            ...user,
            id: uuid.v4(),
        }).then(data => {
            res.status(httpStatusCodes.OK).json({ message: 'User successfully created!!!', data });
        }).catch(error => {
          const { message } = error;
          res.status(httpStatusCodes.BAD_REQUEST).send(`Failed to create user: ${message}`);
        });
    }
);

api.put('/updateUserById', async (req, res) => {
    const { id: userId } = req.query;
    const userInfo = req.body;

    await User.update(
        { ...userInfo },
        {
          where: {
            id: userId,
            isdeleted: false
          },
        }
      ).then(data => {
          if (data && data[0]) {
            res.status(httpStatusCodes.OK).send(`User with id ${userId} was successfully updated!!!`);
          } else {
            res.status(httpStatusCodes.OK).send(`No user with requested id ${userId}`);
          }
      }).catch(error => {
          const { message } = error;
          res.status(httpStatusCodes.BAD_REQUEST).send(`Failed to update user: ${message}`);
      });
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
