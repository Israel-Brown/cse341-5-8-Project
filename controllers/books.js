const Book = require('../models/books'); // Use the Mongoose model

// Get all books
const getAll = async (req, res) => {
  try {
    const books = await Book.find(); // Mongoose method to get all books
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving books.', error });
  }
};

// Get single book
const getSingle = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id); // Mongoose method to get a single book by ID
    if (!book) {
      return res.status(404).json({ message: 'Book not found.' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving book.', error });
  }
};

// Create book
const createBook = async (req, res) => {
  try {
    const newBook = new Book({
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      publishedDate: req.body.publishedDate,
      isbn: req.body.isbn,
    });
    
    const savedBook = await newBook.save(); // Mongoose method to save a new book
    res.status(201).json({
      message: 'Book created successfully',
      bookId: savedBook._id,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating book.', error });
  }
};

// Update book
const updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        publishedDate: req.body.publishedDate,
        isbn: req.body.isbn,
      },
      { new: true } // Option to return the updated document
    );

    if (!book) {
      return res.status(404).json({ message: 'Book not found.' });
    }
    res.status(204).json({ message: 'Book updated successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating book.', error });
  }
};

// Delete book
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id); // Mongoose method to delete book
    if (!book) {
      return res.status(404).json({ message: 'Book not found.' });
    }
    res.status(200).json({ message: 'Book deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting book.', error });
  }
};

module.exports = {
  getAll,
  getSingle,
  createBook,
  updateBook,
  deleteBook,
};

