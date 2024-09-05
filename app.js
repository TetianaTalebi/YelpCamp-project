const express = require('express');

const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const {reviewSchema} = require('./schemas');
const catchAsync = require('./utils/catchasync');
const ExpressError = require('./utils/expresserror');
const methodOverride = require('method-override');

// Require Campground model from models/campground.js
const Campground = require('./models/campground');

// Require Review model from models/review.js
const Review = require('./models/review');

// Require campground routes
const campgrounds = require('./routes/campgrounds');

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

// A middleware that specifies what prefix is used for campground routes
app.use('/campgrounds', campgrounds);



// Setting up a middleware for Joi validation of campground reviews
const validateReview = (req, res, next) => {
    const {error} = reviewSchema.validate(req.body);

    if (error){
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400)
    } else {next()}
}

app.get('/', (req, res) => {
    res.render('home')
    // res.send('Hello from YelpCamp!')
})




// Creating a nested route for adding reviews for a campground
app.post('/campgrounds/:id/reviews', validateReview, catchAsync( async (req, res) => {
    const campground = await Campground.findById(req.params.id);

    // Instantiating a new review
    const review = new Review(req.body.review);
   
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
    // res.send('You posted a review!!!')
}))

// Adding a delete route for campground reviews
app.delete('/campgrounds/:id/reviews/:reviewId', catchAsync( async (req, res) => {
    const {id, reviewId} = req.params;
    await Campground.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/campgrounds/${id}`);
    // res.send('Delete me!!!')
}))

// app.get('/makecampground', async (req, res) => {
//     const camp = new Campground({title: 'My Backyard', description: 'Cheap Camping'});
//     await camp.save();
//     res.send(camp)
// })

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