const Group = require('../../models/group');

const deleteGroupById = async groupId => {
    const res = await Group.destroy(
    {
      where: {
        id: groupId
      },
    }
  ).then(data => {
      if (data) {
        return { data: 1, message: `Group with id ${groupId} was successfully deleted!!!`};
      } else {
        return { data: null, message: `No group with requested id ${groupId}`};
      }
  }).catch(error => {
      return { error };
  });

  return res;
};

module.exports = deleteGroupById;
