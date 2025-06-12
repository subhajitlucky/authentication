// Import JWT library for token verification
const jwt = require("jsonwebtoken");

/**
 * Authentication Middleware Function
 * This middleware verifies JWT tokens in the Authorization header
 * and protects routes from unauthorized access
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object  
 * @param {Function} next - Express next middleware function
 */
const authenticateToken = (req, res, next) => {
  // Get the full Authorization header from the request
  // Expected format: "Bearer <jwt-token>"
  const authHeader = req.header("Authorization");
  
  // Validate that Authorization header exists and follows Bearer token format
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ 
      error: "Access Denied. No valid token provided.",
      hint: "Include 'Authorization: Bearer <token>' header" 
    });
  }

  // Extract the actual token by removing "Bearer " prefix
  // "Bearer ".length = 7, so we start from index 7
  const token = authHeader.substring(7);

  try {
    // Verify the token using our secret key from environment variables
    // This will throw an error if token is invalid, expired, or tampered with
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach the decoded user information to the request object
    // This makes user data available in subsequent route handlers
    req.user = verified;
    
    // Call next() to proceed to the next middleware or route handler
    next();
  } catch (err) {
    // Log the error for debugging purposes
    console.error("🔒 JWT Verification Error:", err.message);
    
    // Return error response with appropriate status code
    res.status(403).json({ 
      error: "Invalid or expired token",
      details: err.message 
    });
  }
};

module.exports = authenticateToken;
