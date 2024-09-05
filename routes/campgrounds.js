const express = require('express');
const router = express.Router();

// A route for viewing all campgrounds
router.get('/campgrounds', catchAsync(async (req, res) => {

    // Find all campgrounds in db and save it to const campgrounds
    const campgrounds = await Campground.find({});

    // Pass the found data to our template
    res.render('campgrounds/index', {campgrounds});
}))

// A route that renders a form for creating a new campground
router.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
})

// A route for posting a new campground into a database
router.post('/campgrounds', validateCampground, catchAsync(async (req, res) => {
    
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`)
}))

// A route for viewing a particular campground
router.get('/campgrounds/:id', catchAsync(async (req, res) => {
    const {id} = req.params;
    const campground = await Campground.findById(id).populate('reviews');
    // console.log(campground)
    res.render('campgrounds/show', { campground })
}))

// A route that renders a form for editing a particular campground
router.get('/campgrounds/:id/edit', catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/edit', {campground})
}))

// A route that posts an update for a particular campground into a database
router.put('/campgrounds/:id', validateCampground, catchAsync(async (req, res) => {

    const {id} = req.params;
    const campground = await Campground.findByIdAndUpdate(id, req.body.campground);
    res.redirect(`/campgrounds/${campground._id}`);
    
}))

// A route that deletes a particular campground from a database
router.delete('/campgrounds/:id', catchAsync(async (req, res) => {
    const {id} = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds')
}))

module.exports = router;