// index.js
require('dotenv').config();         // loads MONGO_URI & PORT from .env
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const PORT = process.env.PORT || 3000;
const MONGO = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/myshop';

// 1) CORS + JSON middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods','GET,POST,PUT,DELETE,OPTIONS');
  next();
});
app.use(express.json());

// 2) Your routes (unchanged)
app.use('/api/users', require('./routes/users'));
app.use('/api/products', require('./routes/products'));
app.use('/api/invoices', require('./routes/invoices'));

// 3) Test endpoints
app.get('/', (req, res) => res.send('🚀 API is live'));
app.post('/', (req, res) => {
  res.json({ received: req.body });
});

// 4) Connect to Mongo AND only then start Express
(async () => {
  try {
    await mongoose.connect(MONGO);
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Mongo connection error:', err.message);
    process.exit(1);
  }
})();
