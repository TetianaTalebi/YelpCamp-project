const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchasync');
const users = require('../controllers/users');
const { storeReturnTo } = require('../middleware');

router.route('/register')
// This route gives a registration form for a user
.get(users.renderRegister)
// This route registers a user
.post(catchAsync(users.register));

router.route('/login')
// This route renders a login form
.get(users.renderLogin)
// This route logs a user in
.post( 
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

// This route logs a user out
router.get('/logout', users.logout);

module.exports = router;