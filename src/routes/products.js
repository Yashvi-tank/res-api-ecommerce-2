const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const upload = require("../middleware/multerConfig");

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productControllers");

// Create a product (protected + image upload)
router.post("/", verifyToken, upload.single("image"), createProduct);

// Get all products (public)
router.get("/", getAllProducts);

// Get a specific product (public)
router.get("/:id", getProductById);

// Update a product (protected)
router.put("/:id", verifyToken, updateProduct);

// Delete a product (protected)
router.delete("/:id", verifyToken, deleteProduct);

module.exports = router;
