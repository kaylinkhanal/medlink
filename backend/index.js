const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: './.env' });

const app = express();
app.use(express.json());

// Routes
app.use('/auth', require('./routes/auth'));

// Connect DB
mongoose.connect(process.env.DB_URI || 'mongodb://localhost:27017/medLink')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start server with fallback port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
