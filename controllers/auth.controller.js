const O_Auth = require("../database/O_Auth");
const User = require("../database/User");
const ActionToken = require("../database/ActionToken");
const { userNormalizator } = require("../utils/user.util");
const { jwtService, emailService} = require("../services");
const {AUTHORIZATION} = require("../configs/constants");
const ErrorHandler = require("../errors/ErrorHandler");
const actionTokenTypeEnum = require("../configs/action-token-type.enum");
const EmailActionEnum = require("../configs/email-action.enum");
const {PORT} = require("../configs/config");

module.exports = {
    login: async (req, res, next) => {
        try {
            const { user } = req;

            const tokenPair = jwtService.generateTokenPair();

            const howManyLogins = await O_Auth.count({ user_id: user._id });

            if (howManyLogins >= 5) {
                throw new Error(`TOO MUCH LOGINS: >${howManyLogins}< !!!`);
            }

            const userNormalized = userNormalizator(user);

            await O_Auth.create({
                ...tokenPair,
                user_id: userNormalized._id
            });

            res.json({
                user: userNormalized,
                ...tokenPair
            });
        } catch (e) {
            next(e);
        }
    },

    logout: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            await O_Auth.remove({
                access_token: token
            });
            res.json('Logout successfully');
        } catch (e) {
            next(e);
        }
    },

    activate: async (req, res, next) => {
        try {
            const {_id} = req.user;
            await User.updateOne({_id}, {is_active: true});

            res.status(200).json('User is active');
        } catch (e) {
            next(e);
        }
    },

    sendMailForgotPassword: async (req, res, next) => {
        try {
            const {email} = req.body;
            const user = await User.findOne({email});

            if (!user) {
                throw new ErrorHandler('User not found', 404);
            }

            const actionToken = jwtService.generateActionToken(actionTokenTypeEnum.FORGOT_PASSWORD);

            await ActionToken.create({
                token: actionToken,
                token_type: actionTokenTypeEnum.FORGOT_PASSWORD,
                user_id: user._id
            });

            await emailService.sendMail(email, EmailActionEnum.FORGOT_PASSWORD, {
                forgotPasswordUrl: `http://localhost:${PORT}/passwordForgot?token=${actionToken}`
            });

            res.json("Reset password sent");
        } catch (e) {
            next(e);
        }
    },

    setNewPasswordAfterForgot: async (req, res, next) => {
        try {
            const actionToken = req.get(AUTHORIZATION);

            if (!actionToken) {
                throw new ErrorHandler('No token', 401);
            }

            await jwtService.verifyToken(actionToken);

            // ................

            res.json("Password has been changed");
        } catch (e) {
            next(e);
        }
    }
};
