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

// This route renders a login form
router.get('/login', users.renderLogin);

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
        // This controller function logs a user in
        users.login);

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