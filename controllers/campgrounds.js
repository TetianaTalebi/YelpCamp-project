const Campground = require('../models/campground');

// This 'index' function finds all campgrounds and renders index page
module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', {campgrounds});
}