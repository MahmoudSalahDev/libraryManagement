# 📚 Library Management System API

A Node.js + Express + MongoDB based backend for managing a library system.  
Supports authentication (JWT), book management, and transaction management (borrowing/returning books).

---

## 🚀 Features
- User & Admin authentication with JWT
- Role-based access control
- CRUD operations for books
- Borrow and return books
- Track user transactions

---

# 🛠️ Tech Stack
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)

---

## 📂 Project Setup

### 1. Clone the Repository
```bash
git clone https://github.com/MahmoudSalahDev/libraryManagement.git
cd libraryManagement

2. Install Dependencies
npm install

3. Setup Environment Variables
Create a .env file in the project root with the following:

PORT="3000"
DB_URL ="mongodb://127.0.0.1:27017/libraryManagmentSystem"
SALT_ROUNDS = theRoundsYouWant
ACCESS_TOKEN_USER = yourUserSecret
ACCESS_TOKEN_ADMIN = yourAdminSecret
REFRESH_TOKEN_USER = yourUserSecret
REFRESH_TOKEN_ADMIN = yourAdminSecret


4. Run the Server
npm start

This is the Postman Link:
https://documenter.getpostman.com/view/39713502/2sB3BHmUHi


📖 API Endpoints
------------------------
🔑 Authentication

POST /api/auth/register → Register a new user

POST /api/auth/login → Login & get JWT token

GET /api/users/profile → Get User Profile


📚 Books

GET /api/books → List all books

POST /api/books (Admin only) → Add a new book

PUT /api/books/:id (Admin only) → Update a book

DELETE /api/books/:id (Admin only) → Delete a book


🔄 Transactions

POST /api/transactions/borrow/:bookId → Borrow a book

PUT /api/transactions/return/:id → Return a book

GET /api/transactions/user → List user’s transactions


