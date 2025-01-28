const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

router.use('/contacts', require('./contacts'));

router.get('/', (req, res) => {
    res.send('Israel Brown');
  });

module.exports = router;