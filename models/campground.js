const { ref } = require('joi');
const mongoose = require('mongoose');

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

// Exporting our Campground model
module.exports = mongoose.model('Campground', CampgroundSchema);