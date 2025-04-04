const express = require("express")
const app = express()
const port = process.env.PORT || 3000;
const userRoutes = require("./routes/users")
const path = require("path")


// image folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")))
//Db connection
const connectDB = require("./utils/db");
connectDB();

//cors middleware
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    next();
});

// Middleware to hash password
const bcrypt = require("bcryptjs");
const saltRounds = 10; // how many times the password is hashed

exports.hashPassword = (req, res, next) => {
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    if (err) {
      return res.status(500).json({ error: "Error hashing password" });
    }
    req.hashedPassword = hash;
    console.log("Your hashed password:", hash);
    next();
  });
};

const { hashPassword } = require("./middleware/passencrypt");


// ROUTES
app.use("/api/users", userRoutes)

// MIDDLEWARE
app.use((req, res, next) => {
    const now = Date.now()
    req.requestTime = now
    next();
   });



   // arithmetic middleware
   app.use(express.json());
   app.use((req, res, next) => {
    const calculation = 4 * 7; 
    req.calculattedValue = calculation;
    next();
   });

// combined response route
   app.get("/", (req, res) => {
    res.json({
        time: req.requestTime,
        calculatedValue: req.calculattedValue,
        message: "Welcome to my world!"
    });
});





app.listen(port,() => {
    console.log(`Example app listening at http://localhost:${3000}`);
});