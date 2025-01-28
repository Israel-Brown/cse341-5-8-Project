const routes = require('express').Router();
const { getName } = require('../controllers/');

routes.get('/', getName);

module.exports = routes;
