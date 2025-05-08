const Invoice = require("../models/invoiceModel");

// GET all invoices for the logged-in user
exports.getInvoices = async (req, res) => {
  const invoices = await Invoice.find({ userId: req.userId });
  res.json(invoices);
};

// POST create a new invoice
exports.createInvoice = async (req, res) => {
  const { products, total } = req.body;
  const newInvoice = new Invoice({ userId: req.userId, products, total });
  const saved = await newInvoice.save();
  res.status(201).json(saved);
};

// GET a single invoice by ID
exports.getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findOne({ _id: req.params.id, userId: req.userId });
    if (!invoice) return res.status(404).json({ message: "Invoice not found" });
    res.json(invoice);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT update an invoice by ID
exports.updateInvoice = async (req, res) => {
  try {
    const updated = await Invoice.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Invoice not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE an invoice by ID
exports.deleteInvoice = async (req, res) => {
  try {
    const deleted = await Invoice.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!deleted) return res.status(404).json({ message: "Invoice not found" });
    res.json({ message: "Invoice deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
