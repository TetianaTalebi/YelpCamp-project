// Require User Model
const User = require('../models/user');

// Renders a registration form for a user
module.exports.renderRegister = (req, res)=>{
    res.render('users/register');
}