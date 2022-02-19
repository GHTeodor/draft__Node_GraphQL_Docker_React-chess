const {Router} = require('express');
const users = require('../db/users');

const apiR = Router();

apiR.get('/', (req, res) => res.json(users));

module.exports = apiR;