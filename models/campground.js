const { ref } = require('joi');
const mongoose = require('mongoose');
const Review = require('./review');

const opts = {toJSON:{virtuals: true}};

// Making a shortcut for mongoose.Schema
const Schema = mongoose.Schema;

// Define an image Schema, because the virtual property will be used on image url
// Virtual property can only be set up on Schema
const ImageSchema = new Schema({
    url: String,
    filename: String
});

ImageSchema.virtual('thumbnail').get(function(){
    return this.url.replace('upload', 'upload/w_200');
})

const CampgroundSchema = new Schema({
    title: String,
    images: [
        ImageSchema
    ],
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
        }
      },
    price: Number,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    // Campground and Review have One-to-Many Mongo DB relationship
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }]
}, opts);

CampgroundSchema.virtual('properties.popUpMarkup').get(function(){
    return `<strong><a href="/campgrounds/${this._id}">${this.title}</a></strong><br>
    <p>${this.description.substring(0,20)}...</p>`
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