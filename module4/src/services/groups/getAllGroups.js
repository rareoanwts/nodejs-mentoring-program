const Group = require('../../models/group');

const getAllGroups = async () => {
    const res = await Group.findAll()
    .then(data => {
        return { data };
    })
    .catch(error => {
        return error;
    });

    return res;
};

module.exports = getAllGroups;
