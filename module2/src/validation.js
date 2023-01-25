const Joi = require('joi');

const userSchema = Joi.object().keys({
    id: Joi.string().required(),
    login: Joi.string().required(),
    password: Joi.string().regex(/^(\d+[a-zA-Z]|[a-zA-Z]+\d)(\d|[a-zA-Z])*/).required(),
    age: Joi.number().integer().min(4).max(130),
    isDeleted: Joi.boolean().required()
});

module.exports = {
    userSchema
};
