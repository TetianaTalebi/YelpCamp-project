
const ExpressError = require('./utils/expresserror');

// Require Campground Joi Schema
const {campgroundSchema} = require('./schemas');

module.exports.isLoggedIn = (req, res, next)=>{
    
    // A middleware for some routes protection
    // A user cannot follow some routes unless he is logged in
    // .isAuthenticated() is Passport Node package helper method
    // This method is added automatically on req object
    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
};

// This middleware saves the data from req.session.returnTo into res.locals.returnTo
module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}

// A middleware for Joi validation of campgrounds
module.exports.validateCampground = (req, res, next) => {

    const {error} = campgroundSchema.validate(req.body);

    if (error){
        const msg = error.details.map(el=>el.message).join(',');
        throw new ExpressError(msg, 400)
    } else {next()}
}

// A middleware that checks whether a logged-in user is the same as a user who created a campground 
// (i.e. it checks whether a logged-in user is an author of a campground)
module.exports.isAuthor = async (req, res, next) => {
    const {id} = req.params;
    const camp = await Campground.findById(id);
    if (!camp.author.equals(req.user._id)){
        req.flash('error', "You don't have permission to do thet!");
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}