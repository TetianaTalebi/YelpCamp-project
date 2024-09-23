const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchasync');
const User = require('../models/user');

// This route gives a registration form for a user
router.get('/register', (req, res)=>{
    res.render('users/register');
})

router.post('/register', catchAsync( async (req, res) =>{
    // In order a user has much better experience, 
    // 'try catch' is used to flash error messages
    // Passport-Local Node package makes a basic validation and provides error messages
    try {
        const {email, username, password} = req.body;
        const user = new User({email, username});
        const registeredUser = await User.register(user, password);
        req.flash('success', 'Welcome to YelpCamp!');
        res.redirect('/campgrounds');

    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
}))

router.get('/login', (req, res)=>{
    res.render('users/login');
})

module.exports = router;