const Campground = require('../models/campground');

const maptilerClient = require('@maptiler/client');
maptilerClient.config.apiKey = process.env.MAPTILER_API_KEY;


const { cloudinary } = require('../cloudinary');

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
    campground.images = req.files.map(f=>({
        url: f.path, 
        filename: f.filename
    }));
    campground.author = req.user._id;
    await campground.save();
    // console.log(campground);
    req.flash('success', 'Successfully made a new campground!!!');
    res.redirect(`/campgrounds/${campground._id}`)
}

// Displays details about a particular campground
module.exports.showCampground = async (req, res) => {
    const {id} = req.params;
    const campground = await Campground.findById(id).populate({path: 'reviews', populate: {path: 'author'}}).populate('author');
    if (!campground){
        req.flash('error', 'Cannot find that campground!!!');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', { campground })
}

// Renders an edit form for editing a particular campground
module.exports.renderEditForm = async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    if (!campground){
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit', {campground})
}

// Updates details about a campground in a database
module.exports.updateCampground = async (req, res) => {
    const {id} = req.params;
    // console.log(req.body);
    const campground = await Campground.findByIdAndUpdate(id, req.body.campground);

    const imgs = req.files.map(f=>({
        url: f.path, 
        filename: f.filename
    }));
    campground.images.push(...imgs);
    await campground.save();

    if(req.body.deleteImages){

        // Removes those images from cloudinary 
        // that have filenames listed in req.body.deleteImages
        for (let filename of req.body.deleteImages){
            await cloudinary.uploader.destroy(filename);
        }

        await campground.updateOne( 

            // $pull operator removes those image references 
            // from campground.images array in MongoDB
            // that have filenames listed in req.body.deleteImages array
            {$pull:{images:{filename:{$in: req.body.deleteImages}}}}
        );
    }
    // console.log(campground);

    req.flash('success', 'Successfully updated campground!!!');
    res.redirect(`/campgrounds/${campground._id}`);
}

// Deletes a campground
module.exports.deleteCampground = async (req, res) => {
    const {id} = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted campground!!!');
    res.redirect('/campgrounds')
}