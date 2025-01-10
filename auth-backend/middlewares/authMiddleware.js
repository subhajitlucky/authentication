const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).send("Access Denied");
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Attach the user information to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    res.status(403).send("Invalid Token");
  }
};

module.exports = authenticateToken;
