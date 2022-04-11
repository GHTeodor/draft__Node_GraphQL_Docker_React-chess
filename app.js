import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fileupload from 'express-fileupload';

import router from "./src/router.js";

dotenv.config();
const {PORT, DB_URL} = process.env;

const app = express();

app.use(express.json());
app.use(express.static('static'));
app.use(fileupload({}));

app.use('/', router);
async function startApp() {
    try {
        await mongoose.connect(DB_URL, {useUnifiedTopology: true, useNewUrlParser: true});
        app.listen(PORT, () => console.log(`Server has been started on PORT ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}

startApp();
