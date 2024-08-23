const authservice = require('../services/auth.service');

const isUserAuthenticated = async (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).json({
            msg: "Token not provided"
        });
    }
    try {
        const verifyToken = await authservice.verfiyJwtToken(token);
        if (!verifyToken) {
            return res.status(401).json({
                msg: "Token not verified"
            });
        }
        req.user = verifyToken.user;
        next();
    } catch (error) {
        return res.status(500).json({
            msg: "Internal server error"
        });
    }
};

module.exports = { 
    isUserAuthenticated 
};
