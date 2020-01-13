const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = async function (req, res, next) {
    // Get Token from Header
    const token = req.header("x-auth-token");

    // Check if No Token
    if (!token) {
        // 401 - Not Authorized
        return res.status(401).json({message: "No token, authorization denied"});
    }

    // Verify Token
    try {

        const decoded = jwt.verify(token, config.get("jwtSecret"));
        req.user = decoded.user;
        next();

    } catch (err) {
        res.status(401).json({message: "Token is not valid"});
    }
};