const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const { authRouter, userRouter } = require('./routes');
const {PORT, MONGO_CONNECT_URL} = require('./configs/config');

mongoose.connect(MONGO_CONNECT_URL);

const app = express();

app.use(cors({ origin: 'http://localhost:3000' })); // todo add in REACT
// function App() {
//     const [users, setUsers] = useState([]);
//
//     useEffect(() => {
//         fetch('http://localhost:5200/users').then(value => value.json()).then(users => setUsers(users));
//     }, []);
//     return (
//         users.map(value => <div key={value._id}>{value._id}>{value.fullName}</div>)
//     );
// }
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRouter);
app.use('/users', userRouter);
// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    res.status(err.status || 500)
        .json({
            message: err.message,
        });
});

app.listen(PORT, () => {
    console.log('App listen ' + PORT);
});
