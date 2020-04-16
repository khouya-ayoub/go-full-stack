// imports
const express = require('express');
// router for manipulate roots that use the data base
const router = express.Router();
//
const databaseController = require('../controllers/data-base');

// todo : sécuriser la route
router.get('getnotification', databaseController.getNotifications);
router.get('getsubscription', databaseController.getSubscriptions);




/**
 * Export the router
 * */
module.exports = router;
