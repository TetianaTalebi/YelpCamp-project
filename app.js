const express = require('express');

const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const Joi = require('joi');
const catchAsync = require('./utils/catchasync');
const ExpressError = require('./utils/expresserror');
const methodOverride = require('method-override');

// Require Campground model from models/campground.js
const Campground = require('./models/campground');

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

const validateCampground = (req, res, next) => {

    const campgroundSchema = Joi.object({
        campground: Joi.object(
            {
                title: Joi.string().required(),
                image: Joi.string().required(),
                price: Joi.number().required().min(0),
                description: Joi.string().required(),
                location: Joi.string().required()
            }
        ).required()
    });
    const {error} = campgroundSchema.validate(req.body);

    if (error){
        const msg = error.details.map(el=>el.message).join(',');
        throw new ExpressError(msg, 400)
    } else {next()}
}

app.get('/', (req, res) => {
    res.render('home')
    // res.send('Hello from YelpCamp!')
})

app.get('/campgrounds', catchAsync(async (req, res) => {

    // Find all campgrounds in db and save it to const campgrounds
    const campgrounds = await Campground.find({});

    // Pass the found data to our template
    res.render('campgrounds/index', {campgrounds});
}))

app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
})

app.post('/campgrounds', catchAsync(async (req, res) => {
    
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`)
}))

app.get('/campgrounds/:id', catchAsync(async (req, res) => {
    const {id} = req.params;
    const campground = await Campground.findById(id);
    // console.log(id)
    res.render('campgrounds/show', { campground })
}))

app.get('/campgrounds/:id/edit', catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/edit', {campground})
}))

app.put('/campgrounds/:id', catchAsync(async (req, res) => {
    const {id} = req.params;

    const campgroundSchema = Joi.object({
        campground: Joi.object(
            {
                title: Joi.string().required(),
                image: Joi.string().required(),
                price: Joi.number().required().min(0),
                description: Joi.string().required(),
                location: Joi.string().required()
            }
        ).required()
    });
    const {error} = campgroundSchema.validate(req.body);

    if (error){
        const msg = error.details.map(el=>el.message).join(',');
        throw new ExpressError(msg, 400)
    }

    const campground = await Campground.findByIdAndUpdate(id, req.body.campground);
    res.redirect(`/campgrounds/${campground._id}`);
    // console.log(req.body.campground);
    // res.send('It works!!!')
}))

app.delete('/campgrounds/:id', catchAsync(async (req, res) => {
    const {id} = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds')
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