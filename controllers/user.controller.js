const User = require('../database/User');
const passwordService = require('../services/password.service');
const userUtil = require('../utils/user.util');

module.exports = {
    getUsers: async (req, res) => {
        try {
            const users = await User.find({});

            res.json(users);
        } catch (e) {
            res.json(e.message);
        }
    },

    getUserById: async (req, res) => {
        try {
            const {user_id} = req.params;
            let user = await User.findById(user_id).lean();

            user = userUtil.userNormalizator(user);


            res.json(user);
        } catch (e) {
            res.json(e.message);
        }
    },

    createUser: async (req, res) => {
        try {
            const hashedPassword = await passwordService.hash(req.body.password);

            // req.body.password = hashedPassword;

            const newUser = await User.create({ ...req.body, password: hashedPassword});

            res.json(newUser);
        } catch (e) {
            res.json(e.message);
        }
    },

    updateUser: async (req, res) => {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.user_id, req.body, { new: true });
            res.json(updatedUser);
        } catch (e) {
            res.json(e.message);
        }
    },

    removeUser: async (req, res) => {
        try {
            const removedUser = await User.findByIdAndDelete(req.params.user_id);
            res.json(removedUser);
        } catch (e) {
            res.json(e.message);
        }
    },
};
