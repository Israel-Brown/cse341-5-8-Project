require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const PORT = process.env.PORT || 3000;

// Home route
app.get('/', (req, res) => {
    res.send('Israel Brown');
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  }).then(() => {
    console.log("Connected to MongoDB");
  }).catch(err => {
    console.log("Error connecting to MongoDB:", err);
  });

// Middleware and routes
app.use(express.json());
const contactRoutes = require('./routes/contacts');
app.use('/api/contacts', contactRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('API is running');
});

const fs = require('fs');
const path = require('path');

console.log('Files in models:', fs.readdirSync(path.resolve(__dirname, './models')));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
