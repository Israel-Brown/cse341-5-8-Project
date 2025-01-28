const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/api-docs')
});

module.exports = router;