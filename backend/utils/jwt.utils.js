const jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = '0g4ez6bvsx71d2sh4uity2d6s4o8yt3s4gt1zs2sd6g41b4es2g87d1e23hghbf4ds5rc';

module.exports = {
    generateTokenForUser: function(userData) {
        return jwt.sign({
                userId: userData.id,
                isAdmin: userData.isAdmin
            },
            JWT_SIGN_SECRET, {
                expiresIn: '1h'
            })
    }
}