const express = require('express');
const router = express.Router();

const catchAsync = require('./utils/catchasync');

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