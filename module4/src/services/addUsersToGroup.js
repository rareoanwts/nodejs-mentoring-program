const uuid = require('uuid');
const UserGroup = require('../models/userGroup');

const addUsersToGroup = async (users, groupid) =>  {
    const rowsToAdd = users.map(userid => ({
        id: uuid.v4(),
        userid,
        groupid,
    }));

    const res = await UserGroup.bulkCreate(rowsToAdd)
    .then(data => {
        return { data };
    })
    .catch(error => {
        const { message } = error;
        return { error: true, message };
    });

    return res;
};

module.exports = {
    addUsersToGroup
};
