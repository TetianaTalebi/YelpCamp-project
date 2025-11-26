if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const ExpressError = require('./utils/expresserror');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');

// Require user routes
const userRoutes = require('./routes/users');

// Require campground routes
const campgroundRoutes = require('./routes/campgrounds');

// Require review routes
const reviewRoutes = require('./routes/reviews');

const MongoStore = require('connect-mongo');

// Production and local databases
const dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/myyelpcamp';

// Create a mongoose.connection shortcut
const db = mongoose.connection;

db.on('connected', () => console.log('connected'));
db.on('open', () => console.log('open'));
db.on('disconnected', () => console.log('disconnected'));
db.on('reconnected', () => console.log('reconnected'));
db.on('disconnecting', () => console.log('disconnecting'));
db.on('close', () => console.log('close'));

mongoose.connect(dbUrl)
.then(() => console.log("Mongo connection is open!"))
.catch((err) => {
    console.log("Mongo connection error!");
    console.log(err);
});

const app = express();

// We are telling Express to use ejs-mate to parse ejs instead of default ejs engine
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// A middleware for parsing req.body
app.use(express.urlencoded({extended: true}));

// 'method-override' middleware lets us use HTTP verbs such as PUT or DELETE in places where the client doesn't support them
// '_method' will be used as a query string
app.use(methodOverride('_method')); 

// Tell Express to serve 'public' directory
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

const mongoStoreSecret = process.env.MONGO_STORE_PW;

const store = MongoStore.create({
    mongoUrl: dbUrl,

    //  A session will be updated one time a day
    touchAfter: 24 * 60 * 60, // Time period in seconds.
    crypto: {
        secret: mongoStoreSecret
    }
});

store.on('error', function(e){
    console.log("Session store error!", e);
});

const sessionConfigSecret = process.env.SESSION_CONFIG_SECRET;

const sessionConfig = {
    store, // it's equal to 'store: store'
    name: '_y_c',
    secret: sessionConfigSecret,
    resave: false,
    saveUninitialized: true,
    cookie: { 
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    }
};

app.use(session(sessionConfig));

// Tell Express to use 'Connect-Flash' Node package
app.use(flash());

// Tell Express to use 'Helmet' Node package
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
    "https://cdn.maptiler.com/",
    "https://cdn.jsdelivr.net",
];
const fontSrcUrls = [
    "https://fonts.gstatic.com",
];

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




app.use(passport.initialize());
app.use(passport.session());

// Tell passport to use a LocalStrategy
// The authenticate method for LocalStrategy locates on a User Model

// authenticate(), serializeUser(), deserializeUser() are methods on a User Model that were added automatically by a plugin passportLocalMongoose
passport.use(new LocalStrategy(User.authenticate()));

// This refers to how a user is stored on a session
passport.serializeUser(User.serializeUser());

// This refers to how a user is got out of a session
passport.deserializeUser(User.deserializeUser());

// We have access to res.locals in our templates automatically
// This middleware allows us to have access to req.flash on every single request
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

// A middleware that specifies what prefix is used for user routes
app.use('/', userRoutes);

// A middleware that specifies what prefix is used for campground routes
app.use('/campgrounds', campgroundRoutes);

// A middleware that specifies what prefix to use for review routes
app.use('/campgrounds/:id/reviews', reviewRoutes);


app.get('/', (req, res) => {
    res.render('home')
})

app.all('*', (req, res, next) => {
    
    res.status(404).render('page404');

    // This next is going to hit our next error handler middleware
    // next(new ExpressError('Page Not Found', 404));
    // res.send('404!!!')
})

app.use((err, req, res, next) => {

    // Destructure the values of statusCode 
    // Error Object is an instance of the class ExpressError, 
    // that is an extended class of generic Express Error

    // Give statusCode and err.message the default values
    const {statusCode = 500} = err;
    if (!err.message) err.message = 'Oh no, something went wrong!!!';
    
    // Intercept Mongoose 'CastError' in production mode and render HTTP 404 page
    // For example, CastError happens when a user tries to view a campground that was deleted ( i.e. a user could have saved a bookmark for a campground in his browser before that campground was deleted)
    if ((err.name==='CastError')&&(process.env.NODE_ENV==='production')){
        return res.status(404).render('page404');
    }

    res.status(statusCode).render('error', {err});
})

app.listen(3000, () => {
    console.log('Serving on port 3000')
})