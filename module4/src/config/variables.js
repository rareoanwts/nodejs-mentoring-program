require('dotenv').config();

module.exports = {
    POSTGRES_USER: process.env.POSTGRES_USER,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    DATABASE: process.env.DATABASE,
    PORT: process.env.PORT
};
