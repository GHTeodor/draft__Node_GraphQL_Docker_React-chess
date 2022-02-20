const {Router} = require('express');

const error = require('../db/error');

const errorRouter = Router();

errorRouter.get('/', (req, res) => {
    res.render('error', {error});
});

module.exports = errorRouter;