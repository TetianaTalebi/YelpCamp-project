const express = require('express');
const router = express.Router();

// Require controllers for campgrounds
const campgrounds = require('../controllers/campgrounds');

const {isLoggedIn, validateCampground, isAuthor} = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');

const upload = multer({storage});

const catchAsync = require('../utils/catchasync');

router.route('/')
// A route for viewing all campgrounds
.get(catchAsync(campgrounds.index))
// A route for posting a new campground into a database
.post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground));
// .post(upload.array('image'), (req,res)=>{
//     console.log(req.body, req.files);
//     res.send("It worked???")
// })

// A route that renders a form for creating a new campground
router.get('/new', isLoggedIn, campgrounds.renderNewForm);

// A route that renders a form for editing a particular campground
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

router.route('/:id')
// A route for viewing a particular campground
.get(catchAsync(campgrounds.showCampground))
// A route that posts an update for a particular campground into a database
.put(isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampground))
// A route that deletes a particular campground from a database
.delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

module.exports = router;