const O_Auth = require("../database/O_Auth");
const { userNormalizator } = require("../utils/user.util");
const { jwtService } = require("../services");

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

    logout: (req, res, next) => {
        try {
            // const {user_id} = req.params;
            // let user = await User.findById(user_id)
            //     .select('name email')
            //     .lean();
            //
            // user = userNormalizator(user);
            //
            //
            // res.json(user);
        } catch (e) {
            next(e);
        }
    }
};
