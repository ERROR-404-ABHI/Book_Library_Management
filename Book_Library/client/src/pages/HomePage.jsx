import Navbar from '../components/Navbar';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
        <div className="text-center max-w-2xl">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 font-serif mb-4">
            Welcome to the Book Library 📚
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 font-light leading-relaxed">
            Your personal space to browse, borrow, and manage your favorite books.
            Whether you're an Admin or a User, our smart and simple system helps you
            keep track of every read.
           <p> Login/Register to Watch and Borrow  Books</p>
          </p>
          <div className="mt-8 space-x-4">
            <a
              href="/login"
              className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition"
            >
              Login
            </a>
            <a href="/register"
              className="inline-block px-6 py-3 bg-gray-300 text-gray-900 font-medium rounded hover:bg-gray-400 transition">
              Register
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
