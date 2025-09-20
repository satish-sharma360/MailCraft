import jwt from 'jsonwebtoken'
import config from '../config/config.js';

const authMiddleware = (req, res, next) => {
    const { accessToken } = req.cookies;
    if (!accessToken) {
        throw new Error()
    }
    try {
        const decoded = jwt.verify(accessToken, config.ACCESS_TOKEN_SECRET)
        req.user = decoded;
        next()
    } catch (error) {
        console.error('JWT verification error:', error.message);
        return res.status(401).json({ success: false, message: 'Not authorized, invalid token.' });
    }
}
export default authMiddleware