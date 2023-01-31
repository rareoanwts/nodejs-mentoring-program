const { Op } = require('sequelize');
const User = require('../../models/user');

const getUsers = async (limit, filter) => {
    const res = await User.findAll({
        limit,
        where: {
            login: {
                [Op.like]: `%${filter}%`
            }
        }
    }).then(data => {
        return { data };
    })
    .catch(error => {
        return { error };
    });

    return res;
};

module.exports = getUsers;
