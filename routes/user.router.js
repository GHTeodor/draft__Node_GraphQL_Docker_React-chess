const router = require('express').Router();

const userController = require("../controllers/user.controller");
const userMiddleware = require("../middlewares/user.middleware");

router.get('/', userController.getUsers);
router.get('/:user_id', userController.getUserById);
router.post('/',
    userMiddleware.isUserBodyValid,
    userMiddleware.createUserMiddleware,
    userController.createUser);
router.patch('/:user_id', userController.updateUser);
router.delete('/:user_id', userController.removeUser);

module.exports = router;
