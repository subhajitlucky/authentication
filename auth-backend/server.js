// Import required packages for the authentication server
const express = require("express");           // Web framework for Node.js
const mongoose = require("mongoose");         // MongoDB object modeling tool
const bodyParser = require("body-parser");    // Middleware to parse request bodies
const cors = require("cors");                 // Cross-Origin Resource Sharing middleware
const dotenv = require("dotenv");             // Load environment variables from .env file
const User = require("./models/User");        // Import User model/schema
const bcrypt = require("bcrypt");             // Library for hashing passwords
const jwt = require("jsonwebtoken");          // Library for creating and verifying JWT tokens
const authenticateToken = require("./middlewares/authMiddleware"); // Custom JWT verification middleware
const crypto = require("crypto");             // Node.js crypto module for generating secure random tokens

// Load environment variables from .env file into process.env
dotenv.config();

// Create Express application instance
const app = express();

// Middleware Setup
app.use(bodyParser.json());  // Parse JSON request bodies (req.body will contain parsed JSON)
app.use(cors());             // Enable Cross-Origin Resource Sharing for frontend-backend communication

// MongoDB Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Routes
app.get("/", (req, res) => res.send("API is running..."));

//Sign up route
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    //check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    //hash the password and save the user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    //send success response
    res.status(201).send("User created successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

//login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    //check if user exists
    const user = await User.findOne({ email });
    //return error if user does not exist
    if(!user){
      return res.status(400).send("Invalid credentials");
    }

    //compare input password with hashed password
    const passMatch = await bcrypt.compare(password, user.password );
    //return error if password doesn't match
    if(!passMatch){
      return res.status(400).send("Invalid credentials");
    }

    //generate jwt token
    const token = jwt.sign(
      {id: user._id, email: user.email}, //payload
      process.env.JWT_SECRET,  //secret key
      {expiresIn: "1h"} //expiration time
    )

    //send success response
    res.status(200).send({message:"Login successful", token});
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Protected route
app.get("/protected", authenticateToken, (req, res) => {
  res.send(`Hello, ${req.user.email}. You have access to this protected route.`);
});



// Forgot Password Route
app.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found.");
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Save token and expiry time in the user's document
    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 3600000; // Token valid for 1 hour
    await user.save();

    // Simulate sending email (log to console)
    console.log(`Password reset token (simulate email): ${resetToken}`);

    res.status(200).send("Password reset link has been sent to your email.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error.");
  }
});

// Reset Password Route
app.post("/reset-password", async (req, res) => {
  const {resetToken, newPassword} = req.body;

  try{
    //find user with the reset token
    const user = await User.findOne({
      resetToken,
      resetTokenExpiry: {$gt: Date.now()}, //check if token is still valid
    });

    if(!user){
      return res.status(400).send("Invalid or expired token");
    }

    //hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpiry = null;
    await user.save();

    res.status(200).send("Password reset successful");


  }catch(err){
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
})

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
