const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('contacts').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving contacts.', error });
  }
};

const getSingle = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('contacts').findOne({ _id: userId });
    if (!result) {
      return res.status(404).json({ message: 'Contact not found.' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving contact.', error });
  }
};

const createContact = async (req, res) => {
  try {
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };
    const response = await mongodb.getDb().db().collection('contacts').insertOne(contact);
    if (response.acknowledged) {
      res.status(201).json({ message: 'Contact created successfully', contactId: response.insertedId });
    } else {
    res.status(500).json({ message: 'Error creating contact.', error });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error creating contact.', error });
  }
};

const updateContact = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const response = await mongodb
      .getDb()
      .db()
      .collection('contacts')
      .replaceOne({ _id: userId }, contact);

    if (response.modifiedCount > 0) {
      res.status(200).json({ message: 'Contact updated successfully.' });
    } else {
    res.status(500).json({ message: 'Error updating contact.', error });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating contact.', error });
  }
};

const deleteContact = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('contacts').deleteOne({ _id: userId });
      if (response.deletedCount > 0) {
        res.status(200).json({ message: 'Contact deleted successfully.' });
      } else {
        res.status(404).json({ message: 'Contact not found.' });
      }
    } catch (error) {
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
