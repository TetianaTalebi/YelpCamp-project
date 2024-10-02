// Require User Model
const User = require('../models/user');

// Renders a registration form for a user
module.exports.renderRegister = (req, res)=>{
    res.render('users/register');
}

// Registers a user
module.exports.register = async (req, res, next) =>{
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
}

// Renders a login form
module.exports.renderLogin = (req, res)=>{
    res.render('users/login');
}

// Logs a user in
module.exports.login = (req, res)=>{
    // If a passport middleware is passed successfully this code will run
    req.flash('success', 'Welcome back!');
    const redirectUrl = res.locals.returnTo || '/campgrounds';
    res.redirect(redirectUrl);
}