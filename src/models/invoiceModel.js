const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  userId: String,
  products: [String],
  total: Number,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Invoice", invoiceSchema);
