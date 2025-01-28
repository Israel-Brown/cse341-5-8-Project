const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const mongodb = require('./db/connect');

// import the routing file to handle the default (index) route
const index = require('./routes/app');
const bookRoutes = require('./routes/contacts');

const app = express(); // create an instance of express

// Middleware for parsing POST data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logger('dev')); // Use Morgan logger

// Add support for CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  next();
});

// Set static directory
app.use(express.static(path.join(__dirname, 'dist/cms')));

// Route handlers
app.use('/', index);
app.use('/books', bookRoutes);

// Handle non-defined routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/cms/index.html'));
});

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to database!');
  } catch (err) {
    console.error('Connection failed:', err);
    process.exit(1); // Exit process if connection fails
  }
};

// Connect to the database and then start the server
connectDB().then(() => {
  // Define the port address
  const port = process.env.PORT || '3000';
  app.set('port', port);

  // Create HTTP server
  const server = http.createServer(app);

  // Start the server
  server.listen(port, () => {
    console.log('API running on localhost:' + port);
  });
});
