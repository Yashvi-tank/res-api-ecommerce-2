const User = require("../models/userModels");
const { hashPassword } = require("../middleware/passencrypt");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.userSignUp = async (req, res) => {
    // getting the data from the request
  const { firstName, lastName, email, password, role, imageUrl } = req.body;
  const hashedPassword = req.hashedPassword;
  // create new user
try {
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

  } catch (err) {
    //catch any errors
    res.status(400).json({
        message: err.message,
    })
  }
}

exports.userLogin = async (req, res) => {
    
    try {
      const { email, password } = req.body;
      //find the user in the database
      const foundUser = await User.findOne({ email})
      if (!foundUser) {
        throw new Error("Invalid credentials")
      } 
      // compare the password from found user with password from request
      const passwordMatch = await bcrypt.compare(password, foundUser.password)
      if (!passwordMatch) {
        throw new Error("Invalid credentials")
      }

      //create a token
      const token = jwt.sign(
        {
            userId: foundUser._id,
        },
        process.env.SECRET_TOKEN_KEY,
        {expiresIn: "24h"}
      )
      res.status(200).json(token)
    } catch (err) {
      res.status(401).json({
        message: err.message,
      })
    }
  
}
