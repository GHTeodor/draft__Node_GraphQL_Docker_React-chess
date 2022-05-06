const router = require('express').Router();

const { authController } = require('../controllers');
const { authMiddleware, userMiddleware } = require('../middlewares');
const {ADMIN, USER} = require("../configs/user-roles.enum");

router.post('/login',
    userMiddleware.isUserPresent,
    userMiddleware.checkUserRole([
        ADMIN,
        USER
    ]),
    authMiddleware.isPasswordMatched,
    authController.login);
router.post('/logout', authMiddleware.checkAccessToken, authController.logout);
router.post('/refresh', authMiddleware.checkRefreshToken, authController.login);

module.exports = router;
