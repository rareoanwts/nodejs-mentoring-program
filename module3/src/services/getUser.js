const User = require('../models/user');

const getUser = async userId => {
    const res = await User.findOne({
        where: {
            id: userId,
            isdeleted: false
        }
    }).then(data => {
        if (data) {
            return { data };
        }

        return { data: 0, message: 'No user with requested id' };
    })
    .catch(error => {
        return { error };
    });

    return res;
};

module.exports = getUser;
