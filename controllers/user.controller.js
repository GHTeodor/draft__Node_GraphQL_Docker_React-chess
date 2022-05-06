const User = require('../database/User');
const passwordService = require('../services/password.service');
const {userNormalizator} = require('../utils/user.util');

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

            // req.body.password = hashedPassword;

            const newUser = await User.create({ ...req.body, password: hashedPassword});

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

    removeUser: async (req, res, next) => {
        try {
            const removedUser = await User.findByIdAndDelete(req.params.user_id);
            res.json(removedUser);
        } catch (e) {
            next(e);
        }
    }
};
