const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notification');


router.post('/subscribe', notificationController.subscribeUser);

module.exports = router;
