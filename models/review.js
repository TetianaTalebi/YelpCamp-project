const mongoose = require('mongoose');

// Defining a shortcut for mongoose.Schema
const Schema = mongoose.Schema;

// Defining a review Mongoose Schema
const ReviewSchema = new Schema({
    body: String,
    rating: Number,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Review', ReviewSchema);
