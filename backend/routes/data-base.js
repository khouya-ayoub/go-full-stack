/**
 * This file contains the routes for roots that manipulate the data base.
 * Please be careful when you change something or you add something, and please
 * add a commenter line that describe your code you had added, and if you can
 * add a test-script for your code in the folder ../tests/tests_---.js.
 *                              Thank you !
 * */
// imports
const express = require('express');
// router for manipulate roots that use the data base
const router = express.Router();
// imports functions and methods
const databaseController = require('../controllers/data-base');
// import the middleware
const authMiddleware = require('../middleware/auth');

// Request for authentication to the system
router.get('/:login/:password', authMiddleware, databaseController.login);

/**
 * Export the router
 * */
module.exports = router;
