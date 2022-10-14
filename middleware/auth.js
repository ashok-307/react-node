const jwt = require('jsonwebtoken');
const config = require('config');


module.exports = async function(req, res, next) {
    // Get the token from the header
    const token = req.header('x-auth-token');

    // If no token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied.'})
    }

    // verify token
    try {
        const decode = jwt.verify(token, config.get('jwtSecretToken'));

        req.user = decode.user;
        next();
    } catch (err) {
        return res.status(401).json({ ms: 'Token is not valid.' });
    }
}