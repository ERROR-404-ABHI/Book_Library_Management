# Project Overview

A full-stack Book Library Management System that allows users to register, log in, view and borrow books, while admins can manage the book catalog with complete CRUD functionality. Built with the MERN stack (MongoDB, Express.js, React.js, Node.js) and styled using Tailwind CSS. Authentication is secured with JWT tokens, and role-based access controls differentiate between normal users and admins.
# Project Setup & Installations
For Backend(server)
[cd server
mkdir
npm install
npm run dev]

For Frontend(client)
[cd client
npx create
npm install
npm run dev]

# Technologies Used & Why?

React.js-Building a fast and interactive frontend

Vite-Lightning-fast development environment for React

Tailwind CSS-Utility-first CSS framework for responsive styling

Node.js & Express.js-Backend server and RESTful API creation

MongoDB & Mongoose-NoSQL database and ODM for schema modeling

JWT (jsonwebtoken)-Authentication and protected route handling

MongoDB Compass-GUI for managing local MongoDB database

# ER- Diagram

User
----
- _id
- name
- email
- password (hashed)
- role (admin/user)

Book
----
- _id
- title
- author
- description
- status (Available/Issued)
- issuedBy (User ID if issued)

BorrowRecord
------------
- _id
- bookId (reference)
- userId (reference)
- borrowDate
- returnDate

# API Endpoints

$ Auth Routes

Method        Route               Purpose

POST      /api/auth/register   Register new user

POST      /api/auth/login     Login user and get JWT


$ Book Routes

Method        Route            Purpose

GET        /api/books      Get all books

POST       /api/books      Add a book (admin only)

PUT       /api/books/:id  Update a book (admin only)

DELETE    /api/books/:id  Delete a book (admin only)

$ Borrow Routes

Method       Route             Purpose

POST   /api/borrow/:bookId   Borrow a book (useronly)

POST  /api/return/:bookId    Return a book (user only)

# Link of The Book_Library GitHub repositary:(https://github.com/ERROR-404-ABHI/Book_Library_Management)

# Demo Video

🎥 [Click here to watch the 3 minute demo video]-(https://drive.google.com/file/d/1uvPbB8sSgSoWiSwv2QxxGKa-uJ0UGN8Y/view?usp=drive_link)

The video includes:

-User registration and login

-Admin and user role-based dashboards

-Book CRUD operations by admin

-Borrow and return functionality by user

-Availability logic enforcement

# Project Highlights

-Fully mobile-responsive using Tailwind

-Secure JWT authentication and authorization

-Local MongoDB setup with Compass

-Role-based access (Admin/User)

-Real-world CRUD and relational data operations

-Developed by: Abhay Singh
