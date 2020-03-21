// imports
const express = require('express');
// router for manipulate roots that use the data base
const router = express.Router();
// imports functions and methods
const userController = require('../controllers/user');


// Routes
router.post('/signup', userController.signup);
router.post('/signin', userController.signin);




/**
 * Export the router
 * */
module.exports = router;
