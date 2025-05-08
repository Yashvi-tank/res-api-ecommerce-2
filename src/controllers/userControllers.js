const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// -------------------- USER LOGIN --------------------
exports.userLogIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find user in DB
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 2. Compare passwords
    const passwordMatch = await bcrypt.compare(password, foundUser.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 3. Create JWT token
    const token = jwt.sign(
      { userId: foundUser._id },
      process.env.SECRET_TOKEN_KEY,
      { expiresIn: "24h" }
    );

    // 4. Return success with token and user info
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: foundUser._id,
        email: foundUser.email,
        role: foundUser.role,
        firstName: foundUser.firstName,
      },
    });

  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

// -------------------- USER SIGNUP --------------------
exports.userSignUp = async (req, res) => {
  try {
    console.log("Signup request received:", req.body);

    const { firstName, lastName, email, imageUrl, role } = req.body;
    const hashedPassword = req.hashedPassword;

    if (!firstName || !lastName || !email || !hashedPassword || !role) {
      return res.status(400).json({
        message: "Missing required fields. Please provide all necessary data.",
      });
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      imageUrl,
      password: hashedPassword,
      role,
      inventory: [],
    });

    const savedUser = await newUser.save();

    res.status(201).json({
      firstName: savedUser.firstName,
      email: savedUser.email,
      role: savedUser.role,
      imageUrl: savedUser.imageUrl,
    });

  } catch (error) {
    console.error("Signup error:", error.message);

    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }

    res.status(500).json({ message: "Something went wrong during signup." });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password"); // Don't return password
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.json({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.error("Profile error:", error.message);
    res.status(500).json({ message: "Something went wrong." });
  }
};
