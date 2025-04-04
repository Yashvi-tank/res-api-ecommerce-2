const User = require("../models/userModels")
const jwt = require('jsonwebtoken');
//check if the authorization header exists
if (!res.headers.authorization) {
    return res.status(403).send({ message: "No token provided!"})
}
  try {

    const token = authHeader.split(' ')[1];
    //verify the token
    
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN_KEY);
    req.userId = decodedToken.userId;
    //check if user exists in database
    const user = await User.findById(req.userId)

    if (!user) {
        return res.status(404).json({message: "User not found"})

    }
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Token is unauthorized' });
  }


module.exports = auth;

exports.verifyToken = (req, res, next) => {
  const token = req.header.authorization.split(' ')[1];
  next()
  console.log(token)
}