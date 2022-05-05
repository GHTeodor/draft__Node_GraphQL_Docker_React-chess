const Joi = require('joi');

const { EMAIL_REGEXP } = require('../configs/constants');
const userRoles = require('../configs/user-roles.enum');

const createUserValidator = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(2)
        .max(10)
        .trim()
        .required(),

    email: Joi.string()
        .regex(EMAIL_REGEXP)
        .required(),

    password: Joi.string()
        .min(8)
        .required(),

    role: Joi.string().allow(...Object.values(userRoles))
});

module.exports = {
    createUserValidator
};
