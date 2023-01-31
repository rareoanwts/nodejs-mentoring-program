const User = require('../../models/user');

const deleteUser = async userId => {
    const res = await User.update(
        { isdeleted: true },
        {
          where: {
            id: userId,
            isdeleted: false
          },
        }
      ).then(async data => {
          if (data && data[0]) {
            return { data: 1, message: `User with id ${userId} was successfully deleted!!!` };
          } else {
            return { data: 0, message: `No user with requested id ${userId}` };
          }
      }).catch(error => {
          return { error };
      });

    return res;
};

module.exports = deleteUser;
