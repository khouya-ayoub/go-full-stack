const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notification');


router.post('/subscribe', notificationController.subscribeUser);
router.post('/send-notification-to-user', notificationController.sendNotificationToUsers);

module.exports = router;
