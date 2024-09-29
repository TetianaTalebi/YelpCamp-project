const express = require('express');
const router = express.Router();

const {isLoggedIn, validateCampground, isAuthor} = require('../middleware');

const catchAsync = require('../utils/catchasync');
const ExpressError = require('../utils/expresserror');

// Require Campground model from models/campground.js
const Campground = require('../models/campground');

// Require Campground Joi Schema
const {campgroundSchema} = require('../schemas');

// A route for viewing all campgrounds
router.get('/', catchAsync(async (req, res) => {

    // Find all campgrounds in db and save it to const campgrounds
    const campgrounds = await Campground.find({});

    // Pass the found data to our template
    res.render('campgrounds/index', {campgrounds});
}))

// A route that renders a form for creating a new campground
router.get('/new', isLoggedIn, (req, res) => {
    res.render('campgrounds/new');
})

// A route for posting a new campground into a database
router.post('/', isLoggedIn, validateCampground, catchAsync(async (req, res) => {
    
    const campground = new Campground(req.body.campground);
    campground.author = req.user._id;
    await campground.save();
    req.flash('success', 'Successfully made a new campground!!!');
    res.redirect(`/campgrounds/${campground._id}`)
}))

// A route for viewing a particular campground
router.get('/:id', catchAsync(async (req, res) => {
    const {id} = req.params;
    const campground = await Campground.findById(id).populate('reviews').populate('author');
    if (!campground){
        req.flash('error', 'Cannot find that campground!!!');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', { campground })
}))

// A route that renders a form for editing a particular campground
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    if (!campground){
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit', {campground})
}))

// A route that posts an update for a particular campground into a database
router.put('/:id', isLoggedIn, isAuthor, validateCampground, catchAsync(async (req, res) => {
    const {id} = req.params;
    const campground = await Campground.findByIdAndUpdate(id, req.body.campground);
    req.flash('success', 'Successfully updated campground!!!');
    res.redirect(`/campgrounds/${campground._id}`);
    
}))

// A route that deletes a particular campground from a database
router.delete('/:id', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
    const {id} = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted campground!!!');
    res.redirect('/campgrounds')
}))

module.exports = router;