const uuid = require('uuid');
const User = require('../models/user');

const createUser = async user => {
    const res = await User.create({
        ...user,
        id: uuid.v4(),
    }).then(data => {
        return { message: 'User successfully created!!!', data };
    }).catch(error => {
      return { error };
    });

    return res;
};

module.exports = createUser;
