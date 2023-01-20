class ValidationError extends Error {
    constructor(message, options) {
        super(message, options);
        this.name = 'ValidationError';
    }
}

const logError = err => {
    console.error(err);
};

const logErrorMiddleware = (err, req, res, next) => {
    logError(err.message);
};

const returnError = (err, req, res) => {
    const { statusCode, message } = err;
    res.status(statusCode).send(message);
};

module.exports = {
    logErrorMiddleware,
    returnError,
    ValidationError
};


const userArraySchema = Joi.array().unique((a, b) => a.login === b.login).messages({
    'array.unique': `User with selected login is already exist`
});