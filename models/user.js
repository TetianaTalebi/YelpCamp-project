const mongoose = require('mongoose');

// Create a shortcut for mongoose.Schema
const Schema = mongoose.Schema;

const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,

        // This is not considered as a validation
        // The validation middleware will be created separately
        unique: true
    }
});

// This adds on a username, a hash and salt fields to a UserSchema,
// makes sure that the usernames are unique and not duplicated
// Also it adds on some more additional methods
UserSchema.plugin(passportLocalMongoose);

// Compile and export a User Model
module.exports = mongoose.model('User', UserSchema);