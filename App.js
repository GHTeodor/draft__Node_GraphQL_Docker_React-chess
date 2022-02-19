const express = require('express');
const path = require('path');

const {engine} = require('express-handlebars');
const apiRoutes = require('./routes/apiRoutes');
const users = require('./db/users');

const app = express();

// Default setup
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'static')));

// Engine setup
app.set('view engine', '.hbs');
app.engine('.hbs', engine({ defaultLayout: false }));
app.set('views', path.join(__dirname, 'static'));

// Routes setup
app.use(apiRoutes);

const PORT = 5200
app.listen(PORT, () => console.log('Serves has been started on PORT ' + PORT));