const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // Prefer Authorization header over cookies because frontend sends it as:
    // Authorization: Bearer <token>
    const authHeader = req.header('Authorization');
    const headerToken = authHeader ? authHeader.replace(/^Bearer\s+/i, '') : undefined;
    const cookieToken = req.cookies && req.cookies.token ? req.cookies.token : undefined;

    const token = headerToken || cookieToken;

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, "gtbsystem123");
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};