const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express'); // Import swagger-ui-express
const swaggerDocument = require('./swagger.json'); // Import the generated swagger.json
const mongodb = require('./db/connect');
const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json())
   .use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      next();
   })
   .use('/', require('./routes'))
   .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // Serve Swagger UI

mongodb.initDb((err) => {
   if (err) {
      console.log(err);
   } else {
      app.listen(port, () => {
         console.log(`Server is running on port ${port}`);
      });
   }
});
