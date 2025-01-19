require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;
const contactRoutes = require('./routes/contacts');

// Home route
app.get('/', (req, res) => {
    res.send('Israel Brown');
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log("Connected to MongoDB");
  }).catch(err => {
    console.log("Error connecting to MongoDB:", err);
  });

// Middleware and routes
app.use('/contacts', contactRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
