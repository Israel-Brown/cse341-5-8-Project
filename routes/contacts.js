const express = require('express');
const router = express.Router();
const Contact = require('./models');

// GET all contacts
router.get('/', async (req, res) => {
    try {
      const contacts = await Contact.find();
      res.status(200).json(contacts);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

// GET contact by ID
router.get('/:id', async (req, res) => {
    try {
      const contact = await Contact.findById(req.params.id);
      if (!contact) {
        return res.status(404).json({ message: 'Contact not found' });
      }
      res.status(200).json(contact);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

// POST route: Create a new contact
router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newContact = new Contact({ firstName, lastName, email, favoriteColor, birthday });
    const savedContact = await newContact.save();
    res.status(201).json({ id: savedContact._id });
  } catch (err) {
    res.status(500).json({ message: 'Error creating contact' });
  }
});

// PUT route to update a contact
router.put('/:id', async (req, res) => {
  try {
      const updatedContact = await Contact.findByIdAndUpdate(
          req.params.id, 
          req.body, 
          { new: true, runValidators: true } // Return the updated document
      );

      if (!updatedContact) {
          return res.status(404).json({ message: 'Contact not found' });
      }

      res.status(200).json({
          message: 'Contact updated successfully',
          updatedContact,
      });
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});


// DELETE route: Delete a contact
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedContact = await Contact.findByIdAndDelete(id);

    if (!deletedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting contact' });
  }
});

module.exports = router;
