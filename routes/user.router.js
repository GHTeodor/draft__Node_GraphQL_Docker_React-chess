const router = require('express').Router();

const {userController} = require("../controllers");
const {userMiddleware, authMiddleware, fileMiddleware} = require("../middlewares");

router.post('/',
    userMiddleware.isUserBodyValid,
    fileMiddleware.checkUserAvatar,
    userMiddleware.createUserMiddleware,
    userController.createUser);
router.get('/', userController.getUsers);
router.patch('/:user_id', userController.updateUser);
router.delete('/', authMiddleware.checkAccessToken, userController.deleteUserByAccessToken);

router.use(authMiddleware.checkAccessToken, userMiddleware.isUserActive); // show only user(s) that has status is_active: true

router.get('/:user_id', userController.getUserById);

module.exports = router;
