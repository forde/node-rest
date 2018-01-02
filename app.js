const express = require('express');
const app = express();
const morgan = require('morgan'); // for request logging
const bodyParser = require('body-parser');

/*
|--------------------------------------------------------------------------
| Database connection
|--------------------------------------------------------------------------
*/

const mongoose = require('mongoose');
// development env. variables are set in nodemon.json
// UI @ https://cloud.mongodb.com/v2/5a4a8a71c0c6e34ee7f67aa9#clusters
const dbUrl = 'mongodb://' + process.env.MONGO_ATLAS_DB_USER + ':' + process.env.MONGO_ATLAS_DB_PASS + process.env.MONGO_ATLAS_DB_URI;
mongoose.connect(dbUrl, {
    //useMongoClient: true // required when using mongo v.4
});


/*
|--------------------------------------------------------------------------
| App middlewares
|--------------------------------------------------------------------------
*/

// middleware for request logging
app.use(morgan('dev'));

// middleware for parsing request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Handeling CORS errors
app.use((req, resp, next) => {
    // accept requests form specific origin (http://client.com) || all origins (*)
    resp.header('Access-Control-Allow-Origin', '*');
    // support following request headers
    resp.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
    // responding to browser preflight request
    // when sending POST or PUT request browser will always send OPTIONS request first to chek if initial request can be made
    if(req.method === 'OPTIONS') {
        // tell browser we are supporting these request methods
        resp.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH')
        // send preflight confirmation to the browser
        return resizeBy.status(200).json({});
    }

    next();
});

// make 'uploads' folder publicly available
app.use('/uploads', express.static('uploads'));


/*
|--------------------------------------------------------------------------
| App routes
|--------------------------------------------------------------------------
*/

// import all product routes
const productRoutes = require('./api/routes/products');
// assign product routes as middleware of all routes that start with '/products'
app.use('/products', productRoutes);

const orderRoutes = require('./api/routes/orders');
app.use('/orders', orderRoutes);

const userRoutes = require('./api/routes/user');
app.use('/user', userRoutes);

/*
|--------------------------------------------------------------------------
| Error handeling
|--------------------------------------------------------------------------
*/

// HTTP error handeling
// if we reached this route handeler it means that no previusly declared route handeler was able to handle the request
app.use((req, resp, next) => {
    // this will catch any unsuported URLs and set error starus
    const error = new Error('Not found');
    error.status = 404;
    // we are not returning an error here (we only set the error and pass it further) - we do it in next middleware that will handle all errors (http errors, database errors etc.)
    next(error);
});

// Global error handeler
app.use((error, req, resp, next) => {
    // here we catch all errors created in proevious middlewares and return them
    resp.status(error.status || 500);
    resp.json({
        error: {
            message: error.message
        }
    })
});



module.exports = app;