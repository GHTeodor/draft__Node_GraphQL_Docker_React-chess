const jwt = require('jsonwebtoken');

const ErrorHandler = require("../errors/ErrorHandler");
const {JWT_ACCESS_SECRET, JWT_REFRESH_SECRET} = require("../configs/config");
const {ACCESS} = require("../configs/tokenType.enum");

module.exports = {
    generateTokenPair: () => {
        const access_token = jwt.sign({}, JWT_ACCESS_SECRET, {expiresIn: '15m'});
        const refresh_token = jwt.sign({}, JWT_REFRESH_SECRET, {expiresIn: '1d'});

        return {
            access_token,
            refresh_token
        };
    },

    verifyToken: async (token, tokenType = ACCESS) => {
        try {
            const secret = tokenType === ACCESS ? JWT_ACCESS_SECRET : JWT_REFRESH_SECRET;

            await jwt.verify(token, secret);
        } catch (e) {
            throw new ErrorHandler('Invalid token', 401);
        }
    }
};
