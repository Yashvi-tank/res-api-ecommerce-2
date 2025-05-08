// src/utils/db.js
require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ecommerce';
  try {
    await mongoose.connect(uri);    // no extra options needed in Mongoose 8+
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ No DB connection!', err);
    process.exit(1);
  }
};

module.exports = connectDB;
