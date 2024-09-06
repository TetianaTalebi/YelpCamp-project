const express = require('express');
const router = express.Router({mergeParams: true});

const ExpressError = require('../utils/expresserror');

// Require Campground model from models/campground.js
const Campground = require('../models/campground');

// Require Review model from models/review.js
const Review = require('../models/review');

// Require Review Joi Schema
const { reviewSchema } = require('../schemas');

const catchAsync = require('../utils/catchasync');

// Setting up a middleware for Joi validation of campground reviews
const validateReview = (req, res, next) => {
    const {error} = reviewSchema.validate(req.body);

    if (error){
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400)
    } else {next()}
}

// Creating a nested route for adding reviews for a campground
router.post('/', validateReview, catchAsync( async (req, res) => {
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
router.delete('/:reviewId', catchAsync( async (req, res) => {
    const {id, reviewId} = req.params;
    await Campground.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/campgrounds/${id}`);
    // res.send('Delete me!!!')
}))

module.exports = router;