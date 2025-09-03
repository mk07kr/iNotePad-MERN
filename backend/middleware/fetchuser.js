const jwt = require("jsonwebtoken");
const secret_key = process.env.JWT_SECRET || "MayankSuperKing";

const fetchuser = (req, res, next) => {
  // Get the token from the Authorization header
  let authToken = req.header("Authorization");

  if (!authToken) {
    return res.status(401).json({ error: "Access denied, no token provided" });
  }

  // If token starts with "Bearer ", remove it
  if (authToken.startsWith("Bearer ")) {
    authToken = authToken.slice(7, authToken.length).trim();
  }

  try {
    // Verify the token
    const data = jwt.verify(authToken, secret_key);
    req.user = data.user; // attach user to req
    next();
  } catch (error) {
    console.error("Invalid token:", error.message);
    res.status(401).json({ error: "Access denied, invalid token" });
  }
};

module.exports = fetchuser;
