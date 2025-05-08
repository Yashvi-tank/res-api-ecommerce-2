const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const upload = require("../middleware/multerConfig");
const { getProfile } = require("../controllers/userControllers");

router.get("/profile", verifyToken, getProfile);

const { hashPassword } = require("../middleware/passencrypt");

const { userLogIn, userSignUp } = require("../controllers/userControllers");

router.post("/login", userLogIn);


router.post("/signup", hashPassword, userSignUp);

router.post("/test", verifyToken, (req, res) => {
    res.send("You have access to this protected route!");
  });
  

  router.put(
    "/userUpdate",
    verifyToken,
    upload.single("image"), // 'image' is the form field name
    (req, res) => {
      console.log(req.body);       // Logs text fields
      console.log(req.file);       // Logs uploaded image details
      console.log(req.userId);     // From token
  
      res.json({ message: "User response reached ✅" });
    }
  );

module.exports = router;
