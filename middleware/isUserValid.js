function isUserValid({body}, res, next) {
    try {
        const {login, password} = body;

        if (!login || !password)
            throw new Error('Login or password is not provided');

        if (password.length <= 6)
            throw new Error('Not valid password');

        next();
    } catch ({message}) {
        console.log(message);
        res.status(400).send(message);
    }
}

module.exports = isUserValid;