const UserGroup = require('../../models/userGroup');

const deleteRecord = async ({ userId, groupId }) => {
    const searchCondition = Object.assign({},
        userId && { userid: userId },
        groupId && { groupid: groupId }
    );

    const res = await UserGroup.destroy(
        {
          where: searchCondition,
        }
      ).then(data => {
          if (data) {
            return { data: 1 };
          } else {
            return { data: 0 };
          }
      }).catch(error => {
          return { error };
      });
    return res;
};

module.exports = deleteRecord;
