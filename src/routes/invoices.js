const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");

const {
  createInvoice,
  getInvoices,
  getInvoiceById,
  updateInvoice,
  deleteInvoice,
} = require("../controllers/invoiceControllers");

// Create invoice (protected)
router.post("/", verifyToken, createInvoice);

// Get all invoices (protected)
router.get("/", verifyToken, getInvoices);

// Get specific invoice by ID (protected)
router.get("/:id", verifyToken, getInvoiceById);

// Update invoice (protected)
router.put("/:id", verifyToken, updateInvoice);

// Delete invoice (protected)
router.delete("/:id", verifyToken, deleteInvoice);

module.exports = router;
