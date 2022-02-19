const {Router} = require('express');
const userRouter = require('./userRouter');
const loginRouter = require('./loginRouter');
const notFoundRouter = require('./notFound');
const apiR = require('./apiR');

const routes = Router();

routes.use('/', apiR);
routes.use('/users', userRouter);
routes.use('/login', loginRouter);
routes.use(notFoundRouter);

module.exports = routes;