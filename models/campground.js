const mongoose = require('mongoose');

// Making a shortcut for mongoose.Schema
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
    title: String,
    image: String,
    price: Number,
    description: String,
    location: String
});

// Exporting our Campground model
module.exports = mongoose.model('Campground', CampgroundSchema);