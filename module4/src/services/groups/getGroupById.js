const Group = require('../../models/group');

const getGroupById = async groupId => {
    const res = await Group.findOne({
        where: {
            id: groupId
        }
    }).then(data => {
        if (data) {
            return { data };
        } else {
            return { data: null, message: 'No group with requested id' };
        }
    })
    .catch(error => {
        return { error };
    })

    return res;
};

module.exports = getGroupById;
