const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express'); // Import swagger-ui-express
const swaggerDocument = require('./swagger.json'); // Import the generated swagger.json
const mongoose = require('mongoose');
const http = require('http');
const dotenv = require('dotenv'); dotenv.config();
const app = express();

app.use(bodyParser.json())
   .use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      next();
   })
   .use('/', require('./routes'))
   .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // Serve Swagger UI

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
    
    connectDB().then(() => {
      const port = process.env.PORT || '3000';
      app.set('port', port);
    
      const server = http.createServer(app);
    
      server.listen(port, () => {
        console.log(`API running on localhost:${port}`);
      });
    });
    