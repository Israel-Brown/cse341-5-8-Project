const express = require("express");
const router = express.Router();
const nameController = require("../controllers/nameController");

// Define the route
router.get("/", nameController.getName);

module.exports = router;
