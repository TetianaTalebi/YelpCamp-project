const Campground = require('../models/campground');

// This 'index' function finds all campgrounds and renders index page
module.exports.index = async (req, res) => {
    // Find all campgrounds in db and save it to const campgrounds
    const campgrounds = await Campground.find({});
    // Pass the found data to our template
    res.render('campgrounds/index', {campgrounds});
}

// Renders a form for creating a new campground
module.exports.renderNewForm = (req, res) => {
    res.render('campgrounds/new');
}

// Creates and save a new campground in a database
module.exports.createCampground = async (req, res) => {
    const campground = new Campground(req.body.campground);
    campground.author = req.user._id;
    await campground.save();
    req.flash('success', 'Successfully made a new campground!!!');
    res.redirect(`/campgrounds/${campground._id}`)
}