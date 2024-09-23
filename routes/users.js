const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchasync');
const User = require('../models/user');

// This route gives a registration form for a user
router.get('/register', (req, res)=>{
    res.render('users/register');
})

router.post('/register', catchAsync( async (req, res) =>{
    const {email, username, password} = req.body;
    const user = new User({email, username});
    const registeredUser = await User.register(user, password);
    console.log(registeredUser);
    req.flash('success', 'Welcome to YelpCamp!');
    res.redirect('/campgrounds');
}))

module.exports = router;