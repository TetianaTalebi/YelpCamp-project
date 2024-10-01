const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchasync');
const User = require('../models/user');
const users = require('../controllers/users');
const { storeReturnTo } = require('../middleware');

// This route gives a registration form for a user
router.get('/register', users.renderRegister);

// This route registers a user
router.post('/register', catchAsync(users.register));

router.get('/login', (req, res)=>{
    res.render('users/login');
})

router.post('/login', 

    // this middleware saves the returnTo value from session to res.locals
    storeReturnTo,

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
            const redirectUrl = res.locals.returnTo || '/campgrounds';
            res.redirect(redirectUrl);
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