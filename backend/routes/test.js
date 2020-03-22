/**
 * Contains all test routes
 * */
const express = require('express');
const router = express.Router();

const testRoutes = {
    testRoutePost: (request, response, next) => {
        if (request.body.email === 'post') {
            return response.status(200).json({ statusTest: 200, message: 'Im the POTS method' });
        } else {
            return response.status(400).json({ statusTest: 400, message: 'NON' });
        }
    },
    testRouteGet: (request, response, next) => {
        if (request.body.email === 'get') {
            return response.status(200).json({ statusTest: 200, message: 'Im the GET method' });
        } else {
            return response.status(400).json({ statusTest: 400, message: 'NON Err' });
        }
    }
};

router.post('/routepost', testRoutes.testRoutePost);
router.get('/routeget', testRoutes.testRouteGet);

module.exports = router;
