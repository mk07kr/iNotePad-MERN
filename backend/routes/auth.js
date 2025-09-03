const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const secret_key = "MayankSuperKing";

// POST MAPPING
// Create a new User @POST => /api/auth/signup
// Validation added Express js
// ROUTE 1:
router.post(
  "/signup",
  [
    body("name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 7 }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success, error: "User already exists with this email" });
      }
      const salt = await bcrypt.genSalt();
      const setPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: setPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, secret_key);
      success = true;
      res.json({ success, authToken });

      // res.json(user);
    } catch (error) {
      res.status(500).send("Some error Occured");
    }
  }
);

// Login User with credentials @POST => /api/auth/login
// ROUTE 2:
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be empty").exists(),
  ],
  async (req, res) => {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let success = false;
    const { email, password } = req.body;

    try {
      // Find user by email
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ success, error: "Invalid credentials, try again!" });
      }

      // Compare passwords
      const passMatch = await bcrypt.compare(password, user.password);
      if (!passMatch) {
        return res
          .status(400)
          .json({ success, error: "Invalid credentials, try again!" });
      }

      // Generate JWT token
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, secret_key, { expiresIn: '3h' });

      // const Id=user.id;
      success = true;
      res.json({ success,authToken});

    } catch (error) {
      console.error("Error during login:", error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Route :3 Get user info :Auth Req :POST
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    // Fetch the userId from the middleware's added property
    const userId = req.user.id;

    // Find the user by ID and exclude the password
    const user = await User.findById(userId).select("-password");

    // Send the user data
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Export
module.exports = router;
