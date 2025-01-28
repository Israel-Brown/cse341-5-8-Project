const Contact = require('../models/contacts'); // Import the Mongoose model

const getAll = async (req, res) => {
  try {
    const contacts = await Contact.find(); // Use Mongoose find to get all contacts
    if (contacts.length === 0) {
      return res.status(404).json({ message: 'No contacts found.' });
    }
    res.status(200).json(contacts);
  } catch (error) {
    console.error('Error retrieving contacts:', error);
    res.status(500).json({ message: 'Error retrieving contacts.', error });
  }
};

const getSingle = async (req, res) => {
  try {
    const contactId = req.params.id;
    const contact = await Contact.findById(contactId); // Use Mongoose findById to get a single contact
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found.' });
    }
    res.status(200).json(contact);
  } catch (error) {
    console.error('Error retrieving contact:', error);
    res.status(500).json({ message: 'Error retrieving contact.', error });
  }
};

const createContact = async (req, res) => {
  try {
    const contactData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };
    const newContact = new Contact(contactData);
    await newContact.save(); // Use Mongoose save to create a new contact
    res.status(201).json({ message: 'Contact created successfully', contactId: newContact._id });
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({ message: 'Error creating contact.', error });
  }
};

const updateContact = async (req, res) => {
  try {
    const contactId = req.params.id;
    const contactData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const updatedContact = await Contact.findByIdAndUpdate(contactId, contactData, { new: true });
    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found.' });
    }
    res.status(200).json({ message: 'Contact updated successfully.', contact: updatedContact });
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({ message: 'Error updating contact.', error });
  }
};

const deleteContact = async (req, res) => {
  try {
    const contactId = req.params.id;
    const deletedContact = await Contact.findByIdAndDelete(contactId); // Use Mongoose findByIdAndDelete to remove a contact
    if (!deletedContact) {
      return res.status(404).json({ message: 'Contact not found.' });
    }
    res.status(200).json({ message: 'Contact deleted successfully.' });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({ message: 'Error deleting contact.', error });
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};
