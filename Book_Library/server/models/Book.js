const mongoose = require('mongoose');
// Book Model
const bookSchema = new mongoose.Schema({
  coverImage: { type: String, default: '' },  
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  totalCopies: { type: Number, required: true, min: 1 },
  borrowedCount: { type: Number, default: 0 }, // How many users have borrowed this book
});

module.exports = mongoose.model('Book', bookSchema);
