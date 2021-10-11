const jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = '0jyt8s8z0gs64azfa1n0x0w5q8g8h158zafanezfolvcnquj547851fa8olsk17';

module.exports = {
    generateTokenForUser: function(userData) {
        return jwt.sign({
                userId: userData.id,
                isAdmin: userdata.isAdmin
            },
            JWT_SIGN_SECRET, {
                expiresIn: '1h'
            })
    }
}