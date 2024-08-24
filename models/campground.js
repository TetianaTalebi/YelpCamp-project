const { ref } = require('joi');
const mongoose = require('mongoose');
const Review = require('./review');

// Making a shortcut for mongoose.Schema
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
    title: String,
    image: String,
    price: Number,
    description: String,
    location: String,
    // Campground and Review have One-to-Many Mongo DB relationship
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }]
});

// Defining a Mongoose Middleware that after deleting a certain campground 
// deletes all related to that campground reviews

CampgroundSchema.post('findOneAndDelete', async function (campground) {
    if (campground.reviews.length) {
        await Review.deleteMany({_id: {$in: campground.reviews}});
    }
})

// Exporting our Campground model
module.exports = mongoose.model('Campground', CampgroundSchema);