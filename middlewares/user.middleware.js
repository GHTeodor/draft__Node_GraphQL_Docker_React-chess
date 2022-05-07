const User = require('../database/User');
const userValidator = require('../validators/user.validator');
const ErrorHandler = require("../errors/ErrorHandler");

module.exports = {
    createUserMiddleware: async (req, res, next) => {
        try {
            const {email} = req.body;
            const foundUser = await User.findOne({email});

            if (foundUser) {
                throw new ErrorHandler(`Email: ${email} has already exist`, 404);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserPresent: async (req, res, next) => {
        try {
            const {email} = req.body;
            const userByEmail = await User.findOne({email})
                .select('+password')
                .lean();

            if (!userByEmail) {
                throw new ErrorHandler(`Wrong email or password`, 418);
            }

            req.user = userByEmail;

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserBodyValid: (req, res, next) => {
        try {
            const { error, value } = userValidator.createUserValidator.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserRole: (roleArr = []) => (req, res, next) => {
        try {
            const {role} = req.user;

            if (!roleArr.includes(role)) {
                throw new Error('Access denied');
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserActive: (req, res, next) => {
        try {
            const {user} = req;

            if (!user.is_active) {
                throw new ErrorHandler('User is not active', 403);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
