const multer = require("multer");

// Define storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // This folder must exist!
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

// Setup multer with storage engine
const upload = multer({ storage: storage });

module.exports = upload;
