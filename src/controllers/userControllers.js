const User = require("../models/userModels");
const { hashPassword } = require("../middleware/passencrypt");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.userSignUp = async (req, res) => {
    // getting the data from the request
  const { firstName, lastName, email, password, role, imageUrl } = req.body;
  const hashedPassword = req.hashedPassword;
  // create new user
  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role,
    imageUrl,
    inventory: [],
  });

  // save the user to the database
  
    const savedUser = await newUser.save();
    res.status(201).json({firstName: savedUser.firstName, email: savedUser.email, role: savedUser.role});
  } 


