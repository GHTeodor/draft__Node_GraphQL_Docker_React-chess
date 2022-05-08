const cors = require('cors');
const express = require('express');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const helmet = require("helmet");

const { authRouter, userRouter } = require('./routes');
const {ALLOWED_ORIGIN, PORT, MONGO_CONNECT_URL, NODE_ENV} = require('./configs/config');
const startCron = require('./cron');
const ErrorHandler = require("./errors/ErrorHandler");
const defaultAdmin = require("./utils/default-data.util");

mongoose.connect(MONGO_CONNECT_URL);

const app = express();

app.use(helmet());
app.use(cors({ origin: _configureCors }));

app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window`
}));

if (NODE_ENV === 'dev') {
    const morgan = require('morgan');

    app.use(morgan('dev'));
}

//**************************************************************************
// app.use(cors({ origin: 'http://localhost:3000' })); // todo add in REACT
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
//**************************************************************************
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

app.listen(PORT, async () => {
    console.log('App listen ' + PORT);
    await defaultAdmin();
    startCron();
});

function _configureCors(origin, callback) {
    const whiteList = ALLOWED_ORIGIN.split(';');

    if (!whiteList.includes(origin)) {
        return callback(new ErrorHandler('CORS is not allowed'), false);
    }
    if (NODE_ENV === 'dev') {
        return callback(null, true);
    }
}
