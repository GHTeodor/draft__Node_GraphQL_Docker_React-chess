const users = require("../db/users");

class LoginController {
    renderLogin(req, res) {
        res.render('login');
    }

    loginUser(req,res) {
        users.push(req.body);
        res.redirect('/users');
    }
}

module.exports = new LoginController();