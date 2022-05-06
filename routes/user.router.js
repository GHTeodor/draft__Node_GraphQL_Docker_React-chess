const router = require('express').Router();

const {userController} = require("../controllers");
const {userMiddleware} = require("../middlewares");

router.get('/', userController.getUsers);
router.get('/:user_id', userController.getUserById);
router.post('/',
    userMiddleware.isUserBodyValid,
    userMiddleware.createUserMiddleware,
    userController.createUser);
router.patch('/:user_id', userController.updateUser);
router.delete('/:user_id', userController.removeUser);

module.exports = router;
