const Group = require('../../models/group');

const updateGroupById = async (groupId, groupInfo) => {
    const res = await Group.update(
    { ...groupInfo },
    {
      where: {
        id: groupId
      },
    }
  ).then(data => {
      console.log("UPDATE DATA: ", data);
      if (data && data[0]) {
        return { data: 1, message: `Group with id ${groupId} was successfully updated!!!`};
      } else {
        return { data: 0, message: `No group with requested id ${groupId}`};
      }
  }).catch(error => {
      return error;
  });

  return res;
};

module.exports = updateGroupById;
