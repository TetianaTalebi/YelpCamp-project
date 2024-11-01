if(process.env.NODE_ENV!=='production'){
    require('dotenv').config();
}

const express = require('express');

const path = require('path');
const mongoose = require('mongoose');

const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');

const helmet = require('helmet');

const mongoSanitize = require('express-mongo-sanitize');

const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const ExpressError = require('./utils/expresserror');
const methodOverride = require('method-override');

// Require user routes
const userRoutes = require('./routes/users');

// Require campground routes
const campgroundRoutes = require('./routes/campgrounds');

// Require review routes
const reviewRoutes = require('./routes/reviews');

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

// Replace the prohibited characters '$' and '.' with '_' in
// - req.body
// - req.params
// - req.headers
// - req.query
app.use(mongoSanitize({
        replaceWith: '_',
    }),
);

// Telling Express to use 'Connect-Flash' Node package
app.use(flash());

// Telling Express to use 'Helmet' Node package
app.use(helmet());

const scriptSrcUrls = [
    "https://stackpath.bootstrapcdn.com/",
    "https://kit.fontawesome.com/",
    "https://cdnjs.cloudflare.com/",
    "https://cdn.jsdelivr.net",
    "https://cdn.maptiler.com/",
];
const styleSrcUrls = [
    "https://kit-free.fontawesome.com/",
    "https://stackpath.bootstrapcdn.com/",
    "https://fonts.googleapis.com/",
    "https://use.fontawesome.com/",
    "https://cdn.jsdelivr.net",
    "https://cdn.maptiler.com/",
];
const connectSrcUrls = [
    "https://api.maptiler.com/",
];
const fontSrcUrls = [];

app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            objectSrc: [],
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
                "https://res.cloudinary.com/dljmlxtmx/",
                "https://images.unsplash.com/",
                "https://api.maptiler.com/",
            ],
            fontSrc: ["'self'", ...fontSrcUrls],
        },
    })
);

const sessionConfig = {
    name: '_y_c',
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

app.use(passport.initialize());
app.use(passport.session());

// Tell passport to use a LocalStrategy
// The authenticate method for LocalStrategy locates on a User Model

// authenticate(), serializeUser(), deserializeUser() are methods on a User Model 
// that were added automatically by a plugin passportLocalMongoose
passport.use(new LocalStrategy(User.authenticate()));

// This refers to how a user is stored on a session
passport.serializeUser(User.serializeUser());

// This refers to how a user is got out of a session
passport.deserializeUser(User.deserializeUser());

// This middleware allows us to have access to req.flash on every single request
// We have access to res.locals in our templates automatically.
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

// app.use((req, res, next)=>{
//     console.log(req.query);
// });

// Making a route where the creation of a new user is hardcoded
// app.get('/fakeUser', async (req, res) => {
//     const user = new User({email: '123@123.com', username: 'Rosa'});
//     const newUser = await User.register(user, 'notagoodpassword');
//     res.send(newUser);
// })

// A middleware that specifies what prefix is used for user routes
app.use('/', userRoutes);

// A middleware that specifies what prefix is used for campground routes
app.use('/campgrounds', campgroundRoutes);

// A middleware that specifies what prefix to use for review routes
app.use('/campgrounds/:id/reviews', reviewRoutes);

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