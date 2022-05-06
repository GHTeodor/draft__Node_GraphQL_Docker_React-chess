const User = require("../database/User");
const {userNormalizator} = require("../utils/user.util");

module.exports = {
    login: (req, res, next) => {
        try {
            const { user } = req;

            const userNormalized = userNormalizator(user);

            res.json(userNormalized);
        } catch (e) {
            next(e);
        }
    },

    logout: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            let user = await User.findById(user_id)
                .select('name email')
                .lean();

            user = userNormalizator(user);


            res.json(user);
        } catch (e) {
            next(e);
        }
    }
};
