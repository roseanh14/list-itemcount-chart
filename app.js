const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { validationResult } = require('express-validator');
const {userValidator} = require("./validation.js")

const listRoutes = require('./api/routes/list');
const itemRoutes = require('./api/routes/item');

const users = require('./test_data/users.json');

const authorize = (req, res, next) => {
    
    let user = users.find((user) => req.body.username === user.name);
    
    if (user.password === req.body.password) {   
        console.log("authorized") 
        next();
    } else {
        
        res.status(403).json({
            error: {
                message: 'Forbidden - Insufficient privileges'
            }
        });
    }
};

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: {
                message: 'Validation failed',
                details: errors.array()
            }
        });
    }
    next();
};


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//app.use(authorize);
app.use('/list', listRoutes);
app.use('/item', itemRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});


module.exports = app;