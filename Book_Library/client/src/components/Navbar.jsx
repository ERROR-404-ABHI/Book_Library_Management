import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-indigo-900 text-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Logo + Title */}
      <div className="flex items-center space-x-3">
        <img
          src="https://cdn-icons-png.flaticon.com/512/29/29302.png"
          alt="Logo"
          className="w-8 h-8"
        />
        <Link to="/" className="text-xl sm:text-2xl font-bold tracking-wide hover:text-yellow-300 transition">
          Book Library
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="space-x-4 text-sm sm:text-base font-medium">
        <Link to="/login" className="hover:text-yellow-300 transition">Login</Link>
        <Link to="/register" className="hover:text-yellow-300 transition">Register</Link>
      </div>
    </nav>
  );
}
