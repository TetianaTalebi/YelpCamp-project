const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchasync');
const User = require('../models/user');

// This route gives a registration form for a user
router.get('/register', (req, res)=>{
    res.render('users/register');
})

router.post('/register', catchAsync( async (req, res, next) =>{
    // In order a user has much better experience, 
    // 'try catch' is used to flash error messages
    // Passport-Local Node package makes a basic validation and provides error messages
    try {
        const {email, username, password} = req.body;
        const user = new User({email, username});
        const registeredUser = await User.register(user, password);

        // This code logs a user in
        req.login(registeredUser, function (err){
            if(err) { return next(err); }
            req.flash('success', 'Welcome to YelpCamp!');
            res.redirect('/campgrounds'); 
        });  
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
}))

router.get('/login', (req, res)=>{
    res.render('users/login');
})

router.post('/login', 

    // This middleware is provided by Passport Node package
    passport.authenticate( 
        // Specifying what strategy is used
        'local', 
        {
            // This option specifies to flash a message automatically
            failureFlash: true, 

            // To redirect if there is an error
            failureRedirect: '/login'
        }), 
        (req, res)=>{
            // If a passport middleware is passed successfully this code will run
            req.flash('success', 'Welcome back!');
            res.redirect('/campgrounds');
})

router.get('/logout', (req, res) => {
    // Passport provides .logout() method that is automatically added on req object
    req.logout( function (err){
        if(err){
            req.flash('error', err.message);
            return res.redirect('/campgrounds');
        };
        req.flash('success', 'Goodbye!');
        res.redirect('/campgrounds');
    });  
})

module.exports = router;