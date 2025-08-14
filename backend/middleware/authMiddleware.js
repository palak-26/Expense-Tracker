const jwt = require('jsonwebtoken'); // For verifying JWT tokens
const User = require('../models/Users'); // Import User model

// =====================
// AUTHENTICATION MIDDLEWARE
// =====================
// This middleware checks if the request has a valid JWT token.
// If valid, it attaches the corresponding user to req.user.
// If not, it sends a 401 Unauthorized response.
const authenticateUser = async (req, res, next) => {
    // Extract token from Authorization header (format: "Bearer <token>")
    let token = req.headers.authorization?.split(" ")[1];
    
    // If no token found, user is not authorized
    if (!token) {
        return res.status(401).json({ message: "Not authorized" });
    }

    try {
        // Verify token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch user from DB (excluding password field)
        req.user = await User.findById(decoded.id).select("-password");

        // Continue to next middleware or route handler
        next();
    }
    catch (error) {
        // If token is invalid or expired
        res.status(401).json({ message: "Token Invalid!" });
    }
};

module.exports = authenticateUser; // Export for use in routes
