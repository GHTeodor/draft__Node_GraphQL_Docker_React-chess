const {Router} = require('express');

const users = require('../db/users');
let error = require('../db/error');

const singInRouter = Router();

singInRouter.get('/', (req, res) => {
    res.render('signIn');
})

singInRouter.post('/', ({ body }, res) => {
    const user = users.find(user => user.email === body.email && user.password === body.password);
    if (!user) {
        error = 'Wrong email or password!';
        res.redirect('/error');
        return;
    }

    res.redirect(`/users/${user.id}`);
});

module.exports = singInRouter;