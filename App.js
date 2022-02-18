const express = require("express");
const {engine} = require("express-handlebars");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, "static")));
app.set('view engine', '.hbs');
app.engine('.hbs', engine({defaultLayout: false}));
app.set('views', path.join(__dirname, 'static'));

app.listen(5200, () => console.log('Server has been started on PORT 5200...'));

const users = [
    {login: 'A', age: 20, password: 'city1'},
    {login: 'B', age: 22, password: 'city2'},
    {login: 'C', age: 24, password: 'city3'}
];

app.get('/', (req, res) => res.json(users));

app.get('/users', (req, res) => res.render('users', {users}));

app.get('/users/:userID', (req, res) => {
    const {userID} = req.params;
    console.log(req.query);
    res.json(users[userID - 1]);
});

app.get('/login', ((req, res) => res.render('Login')));

app.post('/login', ((req, res) => {
    users.push(req.body);
    res.redirect('/users');
}));

app.use((req, res) => res.render('NotFound'));