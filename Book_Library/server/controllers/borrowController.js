const Borrow = require('../models/Borrow');
const Book = require('../models/Book');

// Borrow a Book
exports.borrowBook = async (req, res) => {
  const userId = req.user.id;
  const { bookId } = req.body;

  try {
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    const alreadyBorrowed = await Borrow.findOne({ userId, bookId });
    if (alreadyBorrowed) return res.status(400).json({ message: 'Already borrowed this book' });

    if (book.borrowedCount >= book.totalCopies) {
      return res.status(400).json({ message: 'No copies available' });
    }

    await Borrow.create({ userId, bookId });
    book.borrowedCount += 1;
    await book.save();

    res.json({ message: 'Book borrowed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error borrowing book' });
  }
};

// Return a Book
exports.returnBook = async (req, res) => {
  const userId = req.user.id;
  const { bookId } = req.body;

  if (!bookId) return res.status(400).json({ message: 'Book ID is required' });


  try {
    const borrow = await Borrow.findOne({ userId, bookId });
    if (!borrow) return res.status(404).json({ message: 'Not borrowed yet' });

    await Borrow.deleteOne({ _id: borrow._id });
    await Book.findByIdAndUpdate(bookId, { $inc: { borrowedCount: -1 } });

    res.json({ message: 'Book returned successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error returning book' });
  }
};

// Get borrowed books for a user
exports.getUserBorrowedBooks = async (req, res) => {
  try {
    const borrowed = await Borrow.find({ userId: req.user.id }).populate('bookId');
    res.json(borrowed);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching borrowed books' });
  }
};
