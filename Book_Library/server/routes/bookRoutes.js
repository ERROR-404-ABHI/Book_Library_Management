const express = require('express');
const router = express.Router();
const {
  createBook,
  getAllBooks,
  updateBook,
  deleteBook,
} = require('../controllers/bookController');
const auth = require('../middleware/authMiddleware');


router.get('/', getAllBooks);
router.post('/', auth, createBook);
router.put('/:id', auth, updateBook);
router.delete('/:id', auth, deleteBook);

module.exports = router;
