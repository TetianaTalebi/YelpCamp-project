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