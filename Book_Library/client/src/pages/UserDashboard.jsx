import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

export default function UserDashboard() {
  const [books, setBooks] = useState([]);
  const [borrowed, setBorrowed] = useState([]);
  const token = localStorage.getItem('token');

  const fetchBooks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/books');
      setBooks(res.data);
    } catch (err) {
      console.error('Failed to fetch books:', err);
    }
  };

  const fetchBorrowed = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/borrow/my-books', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBorrowed(res.data);
    } catch (err) {
      console.error('Failed to fetch borrowed books:', err);
    }
  };

  const handleBorrow = async (bookId) => {
    try {
      await axios.post(
        'http://localhost:5000/api/borrow/borrow',
        { bookId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchBooks();
      fetchBorrowed();
    } catch (err) {
      alert(err.response?.data?.message || 'Borrow failed');
    }
  };

  const handleReturn = async (bookId) => {
    try {
      await axios.post(
        'http://localhost:5000/api/borrow/return',
        { bookId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchBooks();
      fetchBorrowed();
    } catch (err) {
      alert(err.response?.data?.message || 'Return failed');
    }
  };

  useEffect(() => {
    fetchBooks();
    fetchBorrowed();
  }, []);

  //  Safe check for null bookId
  const borrowedIds = borrowed
    .filter((entry) => entry.bookId) // skip nulls
    .map((entry) => entry.bookId._id);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-indigo-800 mb-10">
            📖 Your Library Dashboard
          </h2>

          {/* All Books */}
          <section className="mb-14">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Available Books</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {books.map((book) => {
                const available = book.totalCopies - book.borrowedCount;
                const alreadyBorrowed = borrowedIds.includes(book._id);

                return (
                  <div
                    key={book._id}
                    className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden p-4"
                  >
                    <h4 className="text-lg font-bold text-gray-900 mb-1">{book.title}</h4>
                    <p className="text-sm text-gray-700">{book.author} • {book.genre}</p>
                    <p className="text-xs text-gray-500 mt-1">Available: {available}</p>
                    <button
                      onClick={() => handleBorrow(book._id)}
                      disabled={available === 0 || alreadyBorrowed}
                      className={`w-full mt-3 py-2 rounded font-medium text-white transition ${
                        available === 0 || alreadyBorrowed
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-green-600 hover:bg-green-700'
                      }`}
                    >
                      {alreadyBorrowed ? 'Already Borrowed' : 'Borrow'}
                    </button>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Borrowed Books */}
          <section>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Borrowed Books</h3>
            {borrowed.length === 0 ? (
              <p className="text-sm text-gray-500">You haven’t borrowed any books yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {borrowed
                  .filter((entry) => entry.bookId)
                  .map((entry) => (
                    <div
                      key={entry._id}
                      className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden p-4"
                    >
                      <h4 className="text-lg font-bold text-gray-900 mb-1">{entry.bookId.title}</h4>
                      <p className="text-sm text-gray-700">{entry.bookId.author}</p>
                      <p className="text-xs text-gray-500">
                        Borrowed on: {new Date(entry.borrowDate).toLocaleDateString()}
                      </p>
                      <button
                        onClick={() => handleReturn(entry.bookId._id)}
                        className="w-full mt-3 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded transition"
                      >
                        Return
                      </button>
                    </div>
                  ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
}
