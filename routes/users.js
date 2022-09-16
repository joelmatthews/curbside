const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/users');
const passport = require('passport');
const catchAsync = require('../utilities/catchAsync');

router.get('/register', userControllers.renderRegister)

router.post('/register', catchAsync(userControllers.registerUser));

router.get('/login', userControllers.renderLogin)

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login', keepSessionInfo: true }), userControllers.loginUser)

router.get('/logout', userControllers.logoutUser)

module.exports = router;