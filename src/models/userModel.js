const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: false, // Optional, can be empty
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['user', 'vendor', 'admin'], // Defined roles from your use case
  },
  inventory: {
    type: [String], // Example: ["rgb_mousepad_id", "controller_grip_id"]
    required: false,
    default: [],
  }
},
{ timestamps: true }
);

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);


