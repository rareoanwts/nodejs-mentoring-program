const Sequelize = require('sequelize');
const { DATABASE, POSTGRES_USER, POSTGRES_PASSWORD } = require('./config/variables');

const sequelize = new Sequelize(
    DATABASE, POSTGRES_USER, POSTGRES_PASSWORD, {
        host: 'localhost',
        dialect: 'postgres',
    }
);

module.exports = sequelize;
