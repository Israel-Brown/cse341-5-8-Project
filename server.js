const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const logger = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

dotenv.config();

const app = express(); // Initialize express app

// Middleware for request parsing and logging
app.use(express.json()); // Built-in JSON parser
app.use(express.urlencoded({ extended: false })); // Parses URL-encoded data
app.use(logger('dev')); // HTTP request logger

// CORS setup
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  next();
});

// Swagger UI setup for API documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Import and use routes
const indexRoutes = require('./routes/app');
const contactsRoutes = require('./routes/contacts');

app.use('/', indexRoutes); // Root routes
app.use('/api/contacts', contactsRoutes); // Contacts routes

// MongoDB connection setup
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to database!');
  } catch (err) {
    console.error('Database connection failed:', err);
    process.exit(1); // Exit process on failure
  }
};

// Start server after successful database connection
connectDB().then(() => {
  const port = process.env.PORT || 3000;
  app.set('port', port);

  const server = http.createServer(app);

  server.listen(port, () => {
    console.log(`API running on localhost:${port}`);
  });
});
