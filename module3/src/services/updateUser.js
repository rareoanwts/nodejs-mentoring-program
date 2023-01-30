const User = require('../models/user');

const updateUser = async (userId, userInfo) => {
    const res = await User.update(
        { ...userInfo },
        {
          where: {
            id: userId,
            isdeleted: false
          },
        }
    ).then(data => {
        if (data && data[0]) {
            return { message: `User with id ${userId} was successfully updated!!!` };
        } else {
            return { message: `No user with requested id ${userId}` };
        }
    }).catch(error => {
        return { error };
    });

    return res;
};

module.exports = updateUser;
