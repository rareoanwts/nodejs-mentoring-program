const Joi = require('joi');
const { userSchema } = require('./schemas');
const httpStatusCodes = require('../httpStatusCodes');

module.exports = (req, res, next) => {
    const user = req.body
    const { error } = userSchema.validate(user);

        if (error) {
            const { details } = error;
            const message = details.map(i => i.message).join(',');

            res.status(httpStatusCodes.BAD_REQUEST).send(message);
        } else {
            const isUserAlreadyExist = Boolean(global.users.find(({ login }) => login === user.login));

            if (isUserAlreadyExist) {
                const duplicationErrorMessage = `User with login ${user.login} already exist`;

                res.status(httpStatusCodes.BAD_REQUEST).send(duplicationErrorMessage);
            } else {
                next();
            }
        }
  };