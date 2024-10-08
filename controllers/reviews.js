// Require Campground and Review Models
const Campground = require('../models/campground');
const Review = require('../models/review');

// Creates a review for a campground
module.exports.createReview = async (req, res) => {
    const campground = await Campground.findById(req.params.id);

    // Instantiating a new review
    const review = new Review(req.body.review);
    review.author = req.user._id;
   
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success', 'Created new review!!!')
    res.redirect(`/campgrounds/${campground._id}`);
}

// Deletes a review for a campground
module.exports.deleteReview = async (req, res) => {
    const {id, reviewId} = req.params;
    await Campground.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted review!!!');
    res.redirect(`/campgrounds/${id}`);
}