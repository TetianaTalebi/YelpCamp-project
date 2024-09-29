const express = require('express');
const router = express.Router({mergeParams: true});

// Require Campground model from models/campground.js
const Campground = require('../models/campground');

// Require Review model from models/review.js
const Review = require('../models/review');

const catchAsync = require('../utils/catchasync');

const {validateReview, isLoggedIn} = require('../middleware');

// Creating a nested route for adding reviews for a campground
router.post('/', isLoggedIn, validateReview, catchAsync( async (req, res) => {
    const campground = await Campground.findById(req.params.id);

    // Instantiating a new review
    const review = new Review(req.body.review);
   
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success', 'Created new review!!!')
    res.redirect(`/campgrounds/${campground._id}`);
}))

// Adding a delete route for campground reviews
router.delete('/:reviewId', catchAsync( async (req, res) => {
    const {id, reviewId} = req.params;
    await Campground.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted review!!!');
    res.redirect(`/campgrounds/${id}`);
}))

module.exports = router;