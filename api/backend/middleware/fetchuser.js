const jwt = require('jsonwebtoken');
const secret_key = "MayankSuperKing"; 

const fetchuser = (req, res, next) => {
  // Get the token from the header
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ error: 'Access denied, no token provided' });
  }

  try {
    // Verify the token and extract user data
    const data = jwt.verify(token, secret_key);
    // Attach the user object to the request
    req.user = data.user; 
    // Call the next middleware or route handler
    next(); 
  } 
  catch (error) {
    console.error('Invalid token:', error.message);
    res.status(401).json({ error: 'Access denied, invalid token' });
  }
};

module.exports = fetchuser;
