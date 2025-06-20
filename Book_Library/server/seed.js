const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Book = require('./models/Book');
const Borrow = require('./models/Borrow');

dotenv.config();
mongoose.connect(process.env.MONGO_URI);

const seedData = async () => {
  try {
    await User.deleteMany();
    await Book.deleteMany();
    await Borrow.deleteMany();

    const adminPassword = await bcrypt.hash('admin123', 10);
    const userPassword = await bcrypt.hash('user123', 10);

    const admin = await User.create({
      name: 'Admin One',
      email: 'admin@lib.com',
      password: adminPassword,
      role: 'admin',
    });

    const user = await User.create({
      name: 'User One',
      email: 'user@lib.com',
      password: userPassword,
      role: 'user',
    });

    const books = await Book.insertMany([
      { title: 'The Alchemist', author: 'Paulo Coelho', genre: 'Fiction', totalCopies: 4 },
      { title: 'Atomic Habits', author: 'James Clear', genre: 'Self-help', totalCopies: 3 },
      { title: 'Rich Dad Poor Dad', author: 'Robert Kiyosaki', genre: 'Finance', totalCopies: 5 },
      { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Classic', totalCopies: 2 },
      { title: 'Clean Code', author: 'Robert C. Martin', genre: 'Programming', totalCopies: 3 },
    ]);

    // Optional: Seed one borrow entry
    await Borrow.create({
      userId: user._id,
      bookId: books[0]._id,
    });

    // Update book's borrowedCount
    books[0].borrowedCount = 1;
    await books[0].save();

    console.log('✅ Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
};

seedData();
