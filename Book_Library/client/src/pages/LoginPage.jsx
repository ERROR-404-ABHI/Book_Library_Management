import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError('Please fill in both fields');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      if (res.data.user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/user/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200 px-4">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
          <h2 className="text-2xl font-semibold mb-6 text-indigo-800">🔐 Login to Your Account</h2>

          {error && <div className="text-red-600 text-sm mb-4">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <label className="block text-gray-700 text-sm mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded transition"
            >
              Login
            </button>
          </form>

          <p className="mt-4 text-sm text-gray-600">
            Haven't registered yet?{' '}
            <Link
              to="/register"
              className="text-indigo-600 hover:text-indigo-800 font-medium transition"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
