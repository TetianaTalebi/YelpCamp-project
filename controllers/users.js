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