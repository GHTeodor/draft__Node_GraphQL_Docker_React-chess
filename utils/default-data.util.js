const User = require("../database/User");
const {ADMIN} = require("../configs/user-roles.enum");

module.exports = async () => {
    const user = await User.findOne({ role: ADMIN });

    if (!user) {
        await User.createUserWithHashPassword({
            name: 'Default',
            email: 'default.admin@gmail.com',
            password: 'Hell0_World1!',
            role: ADMIN
        });
    }
};
