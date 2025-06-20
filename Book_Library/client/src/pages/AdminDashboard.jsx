import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Trash2, Pencil } from "lucide-react";
// Admin dashboard to perform crud operations 
export default function AdminDashboard() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
    totalCopies: 1,
  });
  const [editingBook, setEditingBook] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const token = localStorage.getItem("token");

  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/books");
      setBooks(res.data);
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const { title, author, genre, totalCopies } = form;
    if (!title || !author || !genre || totalCopies < 1) {
      return alert("Please fill all fields correctly");
    }

    try {
      await axios.post("http://localhost:5000/api/books", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchBooks();
      setForm({ title: "", author: "", genre: "", totalCopies: 1 });
    } catch (err) {
      alert(err.response?.data?.message || "Error adding book");
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this book?"
    );
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/api/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchBooks();
    } catch (err) {
      alert(err.response?.data?.message || "Error deleting book");
    }
  };

  const openEditModal = (book) => {
    setEditingBook(book);
    setForm({
      title: book.title,
      author: book.author,
      genre: book.genre,
      totalCopies: book.totalCopies,
    });
    setShowModal(true);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/books/${editingBook._id}`,
        form,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setShowModal(false);
      setEditingBook(null);
      fetchBooks();
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">
          📘 Admin Dashboard
        </h2>

        {/* Add Book Form */}
        <form
          onSubmit={handleAdd}
          className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4 items-center"
        >
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Author"
            value={form.author}
            onChange={(e) => setForm({ ...form, author: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Genre"
            value={form.genre}
            onChange={(e) => setForm({ ...form, genre: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <input
            type="number"
            placeholder="Copies"
            min="1"
            value={form.totalCopies}
            onChange={(e) =>
              setForm({ ...form, totalCopies: Number(e.target.value) })
            }
            className="p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="col-span-full md:col-span-1 bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Add Book
          </button>
        </form>

        {/* Book Table */}
        <div className="bg-white p-4 rounded shadow overflow-x-auto">
          <h3 className="text-xl font-semibold mb-3">All Books</h3>
          <table className="min-w-full table-auto text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-2">Title</th>
                <th>Author</th>
                <th>Genre</th>
                <th>Total</th>
                <th>Borrowed</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book._id} className="border-t hover:bg-gray-50">
                  <td className="p-2">{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.genre}</td>
                  <td>{book.totalCopies}</td>
                  <td>{book.borrowedCount}</td>
                  <td className="text-center space-x-3">
                    <button
                      onClick={() => openEditModal(book)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Edit"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(book._id)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Update Book Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded w-full max-w-md">
              <h3 className="text-lg font-bold mb-4">Update Book</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Author"
                  value={form.author}
                  onChange={(e) => setForm({ ...form, author: e.target.value })}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Genre"
                  value={form.genre}
                  onChange={(e) => setForm({ ...form, genre: e.target.value })}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="number"
                  placeholder="Total Copies"
                  min="1"
                  value={form.totalCopies}
                  onChange={(e) =>
                    setForm({ ...form, totalCopies: Number(e.target.value) })
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mt-4 flex justify-end space-x-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
