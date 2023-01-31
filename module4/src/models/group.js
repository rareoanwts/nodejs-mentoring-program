const Sequelize = require('sequelize');
const sequelize = require('../sequelize');

const Group = sequelize.define('group', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING,
        unique: true,
        validate: {
            isUnique: (value, next) => {
                const self = this;
                Group.findOne({ where: { name: value } })
                    .then(group => {
                        if (group && self.id && self.id !== group.id) {
                            return next('Group name already in use!');
                        }
                        return next();
                    })
                    .catch(err => {
                        return next(err);
                    });
            }
        },
        allowNull: false
    },
    permissions: {
        type: Sequelize.ARRAY({
            type: Sequelize.STRING
        }),
        validate: {
            isValidPermissionsList: (value, next) => {
                const validPerms = ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'];
                const notAllowedPerms = value.filter(v => !validPerms.includes(v));
                const notValidLength = notAllowedPerms.length;
                
                if (notValidLength) {
                    return next(`Permissions ${notAllowedPerms.join(', ')} ${notValidLength === 1 ? 'is' : 'are'} not allowed`);
                } else {
                    next();
                }
            }
        }
    }
},
    {
        tableName: 'groups',
        timestamps: false,
    }
);

module.exports = Group;
