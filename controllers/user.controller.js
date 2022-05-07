const User = require('../database/User');
const Action = require('../database/Action');
const {passwordService, emailService, jwtService} = require('../services');
const {userNormalizator} = require('../utils/user.util');
const {WELCOME} = require("../configs/email-action.enum");
const {ACTION} = require("../configs/tokenType.enum");
const {PORT} = require("../configs/config");

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const users = await User.find({});

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    getUserById: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            let user = await User.findById(user_id)
                // .select('name email') // show only name and email (and _id)
                // .select('-password') // hide pass
                // .select('+password') // show pass
                .lean();

            user = userNormalizator(user);


            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const hashedPassword = await passwordService.hash(req.body.password);

            const newUser = await User.create({...req.body, password: hashedPassword});
            // req.body.password = hashedPassword;

            const token = jwtService.createActionToken();
            await Action.create({ token, type: ACTION, user_id: newUser._id });

            await emailService.sendMail(req.body.email, WELCOME, {userName: req.body.name, PORT, token});

            res.json(newUser);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.user_id, req.body, { new: true });
            res.json(updatedUser);
        } catch (e) {
            next(e);
        }
    },

    deleteUserByAccessToken: async (req, res, next) => {
        try {
            const removedUser = await User.findByIdAndDelete(req.user._id);
            res.json(removedUser);
        } catch (e) {
            next(e);
        }
    }
};
