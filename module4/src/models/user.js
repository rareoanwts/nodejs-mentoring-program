const Sequelize = require('sequelize');
const sequelize = require('../sequelize');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    login: {
        type: Sequelize.STRING,
        unique: true,
        validate: {
            isUnique: (value, next) => {
                const self = this;
                User.findOne({ where: { login: value } })
                    .then(user => {
                        if (user && self.id !== user.id) {
                            return next('Email already in use!');
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
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            is: {
                args: /^(\d+[a-zA-Z]|[a-zA-Z]+\d)(\d|[a-zA-Z])*/,
                msg: 'password must contain only letters and numbers'
            },
        }
    },
    age: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            min: { args: 4, msg: "age must be in 4..130"},
            max: { args: 130, msg: "age must be in 4..130"},
        }
    },
    isdeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
},
{
    tableName: 'users',
    timestamps: false,
});

module.exports = User;
