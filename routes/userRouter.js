const {Router} = require('express');

const userController = require('../controllers/userController');

const userRouter = Router();

userRouter.get('/', userController.renderUsers);

userRouter.post('/:userId', userController.getUserByID);

userRouter.get('/:userId', userController.getUserByQuery);

module.exports = userRouter;