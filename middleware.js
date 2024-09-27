module.exports.isLoggedIn = (req, res, next)=>{
    
    // A middleware for some routes protection
    // A user cannot follow some routes unless he is logged in
    // .isAuthenticated() is Passport Node package helper method
    // This method is added automatically on req object
    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
};

// This middleware saves the data from req.session.returnTo into res.locals.returnTo
module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}