let users = require("../db/users");
let error = require("../db/error");

class UserController {
    renderUsers({query}, res) {
        if (Object.keys(query).length) {
            let usersArray = [...users];
            if (query.city) {
                usersArray = usersArray.filter(user => user.city === query.city);
            }
            if (query.age) {
                usersArray = usersArray.filter(user => user.age === query.age);
            }

            res.render('users', { users: usersArray });
            return;
        }

        res.render('users', { users });
    }

    getUserByID({params}, res) {
        users = users.filter(user => user.id !== +params.userId);

        res.redirect('/users' );
    }

    getUserByQuery({params}, res) {
        const user = users.find(user => user.id === +params.userId);
        if (!user) {
            error = `User with ID: ${params.userId} exist!`;
            res.redirect('/error');
            return;
        }

        res.render('userInfo', { user });
    }
}

module.exports = new UserController();