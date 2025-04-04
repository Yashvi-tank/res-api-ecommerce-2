const express = require("express")
const router = express.Router()
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { userSignUp, createUser, userLogin } = require("../controllers/userController");
const User = require("../models/User");
const auth = require("../middleware/auth");
const { hashPassword } = require("../middleware/passencrypt")
const upload = require("../middleware/multerConfig");
const sharpMiddleware = require("../middleware/sharpMiddleware");

router.post("/login", userLogin); //login route
router.post("/signup", hashPassword, userSignUp); //signup route
router.post("/test", verifyToken, (req, res) => {
  console.log(req.userId);
  res.send("test")
})
router.get("/form", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});


//define routes for users
router.get('/', (req, res) => {
    res.send('WELCOME TO MY PAGE')
})

router.post("/", (req, res) => {
    //get data from the request
    const { firstName, email, password } = req.body
    res.json({ firstName, email, hashedPassword, _id: "randomId4567",})
})

app.post("/", hashPassword, (req, res) => {
    // Get the data from the request
    const { firstName, email } = req.body;
    const hashedPassword = req.hashedPassword;
  
    res.json({
      firstName,
      email,
      hashedPassword,
      _id: "randomId4567",
    });
  });

  // Protected routes
router.get("/", auth, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/create", auth, hashPassword, createUser);

router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router