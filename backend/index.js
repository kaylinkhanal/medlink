const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config({ path: './.env' });

const app = express();
app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to MedLink API" });
});

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/auth'));

const departmentRoutes = require("./routes/departmentRoutes");
const hospitalRoutes = require("./routes/hospitalRoutes");

app.use("/departments", departmentRoutes);
app.use("/hospitals", hospitalRoutes);

// Connect DB
mongoose.connect(process.env.DB_URI || 'mongodb://localhost:27017/medLink')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start server with fallback port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
