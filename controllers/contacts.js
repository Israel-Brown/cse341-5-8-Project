const Contact = require('../models/contacts'); // Use the Mongoose model

// Get all contacts
const getAll = async (req, res) => {
  try {
    const contacts = await Contact.find(); // Mongoose method to get all contacts
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving contacts.', error });
  }
};

// Get single contact
const getSingle = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id); // Mongoose method to get a single contact by ID
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found.' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving contact.', error });
  }
};

// Create contact
const createContact = async (req, res) => {
  try {
    const newContact = new Contact({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
    });
    
    const savedContact = await newContact.save(); // Mongoose method to save a new contact
    res.status(201).json({
      message: 'Contact created successfully',
      contactId: savedContact._id,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating contact.', error });
  }
};

// Update contact
const updateContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday,
      },
      { new: true } // Option to return the updated document
    );

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found.' });
    }
    res.status(204).json({ message: 'Contact updated successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating contact.', error });
  }
};

// Delete contact
const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id); // Mongoose method to delete contact
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found.' });
    }
    res.status(200).json({ message: 'Contact deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting contact.', error });
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact,
};
