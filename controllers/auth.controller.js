const O_Auth = require("../database/O_Auth");
const User = require("../database/User");
const { userNormalizator } = require("../utils/user.util");
const { jwtService } = require("../services");
const {AUTHORIZATION} = require("../configs/constants");

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
};
