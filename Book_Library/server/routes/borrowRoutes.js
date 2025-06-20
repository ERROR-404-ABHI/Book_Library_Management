const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  borrowBook,
  returnBook,
  getUserBorrowedBooks,
} = require('../controllers/borrowController');

router.post('/borrow', auth, borrowBook);
router.post('/return', auth, returnBook);
router.get('/my-books', auth, getUserBorrowedBooks);

module.exports = router;
