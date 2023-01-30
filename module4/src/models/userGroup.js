const Sequelize = require('sequelize');
const sequelize = require('../sequelize');

const userGroup = sequelize.define('group', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    userid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
    },
    groupid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
    },
},
{
    tableName: 'usergroup',
    timestamps: false,
});

module.exports = userGroup;

