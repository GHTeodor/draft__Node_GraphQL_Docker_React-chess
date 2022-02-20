function isUserValid({body}, res, next) {
    try {
        const {email, password} = body;

        if (!email || !password)
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