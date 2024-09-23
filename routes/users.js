const express = require('express');
const router = express.Router();
const User = require('../models/user');

// This route gives a registration form for a user
router.get('/register', (req, res)=>{
    res.render('users/register');
})

module.exports = router;