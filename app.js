const express = require('express');

const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const ExpressError = require('./utils/expresserror');
const methodOverride = require('method-override');

// Require campground routes
const campgrounds = require('./routes/campgrounds');

// Require review routes
const reviews = require('./routes/reviews');

// Create a mongoose.connection shortcut
const db = mongoose.connection;

db.on('connected', () => console.log('connected'));
db.on('open', () => console.log('open'));
db.on('disconnected', () => console.log('disconnected'));
db.on('reconnected', () => console.log('reconnected'));
db.on('disconnecting', () => console.log('disconnecting'));
db.on('close', () => console.log('close'));

mongoose.connect('mongodb://127.0.0.1:27017/myyelpcamp')
.then(() => console.log("Mongo connection is open!"))
.catch((err) => {
    console.log("Mongo connection error!");
    console.log(err)
})

const app = express();

// We are telling Express to use ejs-mate to parse ejs
// instead of default ejs engine
app.engine('ejs', ejsMate);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// A middleware for parsing req.body
app.use(express.urlencoded({extended: true}));

// Load 'method-override' middleware
// that lets us use HTTP verbs such as PUT or DELETE 
// in places where the client doesn't support it.
app.use(methodOverride('_method')); // '_method' will be used as a query string

// Telling Express to serve 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Telling Express to use 'Connect-Flash' Node package
app.use(flash());

const sessionConfig = {
    secret: 'thisshouldbeabettersecret',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        httpOnly: true,
        expires: Date.now()+1000*60*60*24*7,
        maxAge: 7*24*60*60*1000,
    }
};

app.use(session(sessionConfig));

// A middleware that specifies what prefix is used for campground routes
app.use('/campgrounds', campgrounds);

// A middleware that specifies what prefix to use for review routes
app.use('/campgrounds/:id/reviews', reviews);

app.get('/', (req, res) => {
    res.render('home')
    // res.send('Hello from YelpCamp!')
})

app.all('*', (req, res, next) => {
    //This next is going to hit our next error handler middleware
    next(new ExpressError('Page Not Found', 404));

    // res.send('404!!!')
})

app.use((err, req, res, next) => {

    // Destructure the values of statusCode and message from the err object 
    // that is an instance of the class ExpressError, that is an extended class of generic Express Error

    // Give statusCode and message the default values
    
    const {statusCode = 500} = err;
    if (!err.message){
        err.message='Oh no, something went wrong!!!';
    }
    res.status(statusCode).render('error', {err});

    // console.log(err);
    // res.send('Something went wrong! :(');
})

app.listen(3000, () => {
    console.log('Serving on port 3000')
})