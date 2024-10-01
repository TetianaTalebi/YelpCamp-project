const express = require('express');
const router = express.Router({mergeParams: true});

// Require reviews controllers
const reviews = require('../controllers/reviews');

// Require Campground model from models/campground.js
const Campground = require('../models/campground');

// Require Review model from models/review.js
const Review = require('../models/review');

const catchAsync = require('../utils/catchasync');

const {validateReview, isLoggedIn, isReviewAuthor} = require('../middleware');

// Creating a nested route for adding reviews for a campground
router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview));

// Adding a delete route for campground reviews
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync( async (req, res) => {
    const {id, reviewId} = req.params;
    await Campground.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted review!!!');
    res.redirect(`/campgrounds/${id}`);
}))

module.exports = router;