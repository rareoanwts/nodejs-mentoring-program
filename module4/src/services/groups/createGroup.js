const uuid = require('uuid');
const Group = require('../../models/group');

const createGroup = async group => {
    const res = await Group.create({
        ...group,
        id: uuid.v4(),
    }).then(data => {
        return { message: 'Group successfully created!!!', data };
    }).catch(error => {
        return { error };
    });

    return res;
};

module.export = createGroup;
