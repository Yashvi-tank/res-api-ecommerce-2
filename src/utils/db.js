require("dotenv").config();
const mongoose = require("mongoose");

const mongoConnection = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/e_commerce_db"; // fallback for local

mongoose.set("strictQuery", true);

const connectDB = async () => {
    try {
        await mongoose.connect(mongoConnection, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("✅ Connected to MongoDB");
    } catch (error) {
        console.error("❌ No DB connection!", error);
        process.exit(1);
    }
};

module.exports = connectDB;
