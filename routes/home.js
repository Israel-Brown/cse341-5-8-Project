const express = require('express');
const router = express.Router();
const { getName } = require('../controllers/homeController');

// Home route
router.get('/', getName);

module.exports = router;