const jwt = require('jsonwebtoken');

module.exports = (request, response, next) => {
    try {
        const token = request.headers.authorization;
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        if (request.body.userId && 16 !== userId) {
            throw 'User ID not available !';
        } else {
            next();
        }
    } catch (error) {
        response.status(401).json({
            error: error |
                'Request not authenticated !'
        });
    }
}
