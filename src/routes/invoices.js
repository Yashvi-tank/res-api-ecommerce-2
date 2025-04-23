const express = require("express");
const router = express.Router();
const {
  createInvoice,
  getInvoices,
  getInvoiceById,
  updateInvoiceStatus
} = require("../controllers/invoiceController");
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

// Protect all routes with authentication
router.use(auth);

// Regular user routes
router.post("/", createInvoice);
router.get("/:id", getInvoiceById);

// Admin only routes
router.get("/", adminAuth, getInvoices);  
router.patch("/:id/status", adminAuth, updateInvoiceStatus);  

module.exports = router;