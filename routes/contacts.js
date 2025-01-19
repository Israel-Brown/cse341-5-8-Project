const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Contact = require('../models/contact');

// GET all contacts
router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET contact by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Validate the ObjectId format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ObjectId format' });
        }

        const contact = await Contact.findById(id);

        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.json(contact); // Send the contact back as JSON
    } catch (err) {
        console.error('Error fetching contact:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
