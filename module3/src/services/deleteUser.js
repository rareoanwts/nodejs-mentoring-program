const User = require('../models/user');

const deleteUser = async userId => {
    const res = await User.update(
        { isdeleted: true },
        {
          where: {
            id: userId,
            isdeleted: false
          },
        }
    ).then(data => {
        if (data && data[0]) {
            return { message: `User with id ${userId} was successfully deleted!!!` };
        } else {
            return { message: `No user with requested id ${userId}` };
        }
    }).catch(error => {
        return { error };
    });

    return res;
};

module.exports = deleteUser;
