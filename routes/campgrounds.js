const express = require('express');
const router = express.Router();

router.get('/campgrounds', catchAsync(async (req, res) => {

    // Find all campgrounds in db and save it to const campgrounds
    const campgrounds = await Campground.find({});

    // Pass the found data to our template
    res.render('campgrounds/index', {campgrounds});
}))

router.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
})

router.post('/campgrounds', validateCampground, catchAsync(async (req, res) => {
    
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`)
}))

router.get('/campgrounds/:id', catchAsync(async (req, res) => {
    const {id} = req.params;
    const campground = await Campground.findById(id).populate('reviews');
    // console.log(campground)
    res.render('campgrounds/show', { campground })
}))

router.get('/campgrounds/:id/edit', catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/edit', {campground})
}))

router.put('/campgrounds/:id', validateCampground, catchAsync(async (req, res) => {

    const {id} = req.params;
    const campground = await Campground.findByIdAndUpdate(id, req.body.campground);
    res.redirect(`/campgrounds/${campground._id}`);
    
}))

router.delete('/campgrounds/:id', catchAsync(async (req, res) => {
    const {id} = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds')
}))

module.exports = router;