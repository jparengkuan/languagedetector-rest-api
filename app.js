const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

const userRoutes = require('./api/routes/user')

// Connect to database
mongoose.connect(
    process.env.DB_CONNECTION.toString(),
    {
        useCreateIndex: true,
        useNewUrlParser: true
    }
)

// Logging purposes
app.use(morgan('dev'));

// Body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//     );
//     if (req.method === 'OPTIONS') {
//         res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
//         return res.status(200).json({});
//     }
//
// });


// Routes wich should handle requests
app.use('/user', userRoutes)

// If no route is found display a error
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.statusCode = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});


module.exports = app;

