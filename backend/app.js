const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./databases/user.schema');
const {HOST, PORT, MONGO_URL} = require('./configs/config');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/users', async (req, res) => {
    const users = await User.find().select('-__v');

    res.json(users);
});

app.post('/users', async (req, res) => {
    const user = await User.create(req.body);

    res.json(user);
});

const start = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        app.listen(+PORT, HOST, () => console.log(`Server has been started on PORT: ${PORT} 🚀🚀🚀`));
    } catch ({message}) {
        console.log(message);
    }
};

start();
