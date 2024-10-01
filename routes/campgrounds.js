const express = require('express');
const router = express.Router();

// Require controllers for campgrounds
const campgrounds = require('../controllers/campgrounds');

const {isLoggedIn, validateCampground, isAuthor} = require('../middleware');

const catchAsync = require('../utils/catchasync');

// Require Campground model from models/campground.js
const Campground = require('../models/campground');

// A route for viewing all campgrounds
router.get('/', catchAsync(campgrounds.index));

// A route that renders a form for creating a new campground
router.get('/new', isLoggedIn, campgrounds.renderNewForm);

// A route for posting a new campground into a database
router.post('/', isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground));

// A route for viewing a particular campground
router.get('/:id', catchAsync(campgrounds.showCampground));

// A route that renders a form for editing a particular campground
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

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