#  Book Library Management System

##  Project Overview

A full-stack Book Library Management System that allows users to register, log in, view and borrow books, while admins can manage the book catalog with complete CRUD functionality.

Built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js) and styled using **Tailwind CSS**. Authentication is secured using **JWT tokens**, and **role-based access controls** differentiate between normal users and admins.

---

##  Project Setup & Installation

###  Backend (Server)
```
cd server
mkdir
npm install
npm run dev
```
### Frontend (Client)
```
cd client
npx create
npm install
npm run dev
```
### Environment Variables(.env)
```
PORT=5000
DB_URI=mongodb://localhost:27017/booklibrary
JWT_SECRET=your_jwt_secret_key
```
### Technologies Used & Why?
```
Technology     	Purpose
React.js	    Building a fast and interactive frontend
Vite	        Lightning-fast dev environment for React
Tailwind CSS	Utility-first CSS framework for responsive styling
Node.js & Express.js	Backend server and RESTful API creation
MongoDB & Mongoose	NoSQL database and ODM for schema modeling
JWT (jsonwebtoken)	Authentication and protected route handling
MongoDB Compass	GUI for managing local MongoDB database
```
### Entity Realationship Diagram (ER  Diagram)
```
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
```
### API Endpoints
```
$ Auth Routes
Method	Route	Purpose
POST	/api/auth/register	Register new user
POST	/api/auth/login	Login user and get JWT

$ Book Routes
Method	Route	Purpose
GET	/api/books	Get all books
POST	/api/books	Add a book (admin only)
PUT	/api/books/:id	Update a book (admin only)
DELETE	/api/books/:id	Delete a book (admin only)

$ Borrow Routes
Method	Route	Purpose
POST	/api/borrow/:bookId	Borrow a book (user only)
POST	/api/return/:bookId	Return a book (user only)
```
## GitHub Repository
📁 Book Library Management GitHub Repo-(https://github.com/ERROR-404-ABHI/Book_Library_Management)

### Demo video
[Click here to watch the 3 minutes demo video]-(https://drive.google.com/file/d/1uvPbB8sSgSoWiSwv2QxxGKa-uJ0UGN8Y/view?usp=drive_link)
```
The video includes:
-User registration and login

-Admin and user role-based dashboards

-Book CRUD operations by admin

-Borrow and return functionality by user

-Book availability logic implementation
```
### Project Highlights
```
-Fully mobile-responsive using Tailwind

-Secure JWT authentication and authorization

-Role-based access (Admin/User)

-Local MongoDB with Compass

-Real-world CRUD and relational data operations
```
### Commit Strategy
```
Every file was committed one-by-one with a meaningful message
( e.g., Add borrowController - handle borrow/return logic)

Avoided bulk commits (like git add .) to maintain traceability
```
### Developed by
-Abhay Singh
-singhabhay101003@gmail.com




