const express = require('express');
const mongoose = require('mongoose');

const userRouter = require('./routes/user.router');
const {PORT, MONGO_CONNECT_URL} = require('./configs/config');

mongoose.connect(MONGO_CONNECT_URL);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);

app.listen(PORT, () => {
    console.log('App listen ' + PORT);
});
