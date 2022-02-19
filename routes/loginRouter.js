const {Router} = require('express');

const loginController = require('../controllers/loginController');
const loginMiddleWare = require('../middleware/isUserValid');
const loginRouter = Router();

loginRouter.get('/', loginController.renderLogin);

loginRouter.post('/', loginMiddleWare, loginController.loginUser);

module.exports = loginRouter;