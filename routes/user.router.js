const router = require('express').Router();

const {userController} = require("../controllers");
const {userMiddleware, authMiddleware} = require("../middlewares");

router.post('/',
    userMiddleware.isUserBodyValid,
    userMiddleware.createUserMiddleware,
    userController.createUser);

router.use(authMiddleware.checkAccessToken, userMiddleware.isUserActive);

router.get('/', userController.getUsers);
router.get('/:user_id', userController.getUserById);
router.patch('/:user_id', userController.updateUser);
router.delete('/', authMiddleware.checkAccessToken, userController.deleteUserByAccessToken);

module.exports = router;
