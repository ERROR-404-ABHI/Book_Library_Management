const Book = require('../models/Book');

// Create Book
exports.createBook = async (req, res) => {
  const { title, author, genre, totalCopies } = req.body;

  if (!title || !author || !genre || totalCopies < 1) {
    return res.status(400).json({ message: 'All fields are required with valid values' });
  }

  try {
    const book = new Book({ title, author, genre, totalCopies });
    await book.save();
    res.status(201).json({ message: 'Book added successfully', book });
  } catch (err) {
    res.status(500).json({ message: 'Error creating book' });
  }
};

// Get all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching books' });
  }
};

// Update book
exports.updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, genre, totalCopies } = req.body;

  try {
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { title, author, genre, totalCopies },
      { new: true }
    );
    res.json(updatedBook);
  } catch (err) {
    res.status(500).json({ message: 'Error updating book' });
  }
};

// Delete book
exports.deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: 'Book deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting book' });
  }
};
