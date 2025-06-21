# 📚 Library Management API

A **Library Management System** built with **Express**, **TypeScript**, and **MongoDB (Mongoose)**.  
This project allows you to manage books, borrow them with availability checks, and view borrowed book summaries — with clean API design and consistent error handling.

---

## ✅ Features

- 📖 **Books CRUD:** Create, Read, Update, Delete books with validation.
- 🔑 **Borrow books:** Checks available copies and auto-updates book status.
- 📊 **Borrow Summary:** Aggregates total quantity borrowed per book.
- ✅ **Schema Validation:** Enforces constraints like genre enum, copies >= 0.
- ⚡ **Filtering & Sorting:** Filter books by genre, sort by any field.
- 🛠️ **Consistent Error Response:** Unified error format for all failures.

---

## ⚙️ Tech Stack

- **Backend:** Express, TypeScript
- **Database:** MongoDB with Mongoose
- **Validation & Business Logic:** Mongoose schema, validators, static & instance methods, middleware.

---

## 📁 Project Structure

📁 node_modules
📁 src
 └── 📁 app
      ├── 📁 controllers
      │     ├── 📄 book.controller.ts
      │     └── 📄 borrow.controller.ts
      ├── 📁 interfaces
      │     ├── 📄 book.interface.ts
      │     └── 📄 borrow.interface.ts
      ├── 📁 models
      │     ├── 📄 book.model.ts
      │     └── 📄 borrow.model.ts
      ├── 📁 utils
      ├── 📄 app.ts
      └── 📄 server.ts
📄 .env
📄 .gitignore
📄 package-lock.json
📄 package.json
📄 tsconfig.json


---

## 🚀 Setup Instructions

1️⃣ **Clone the repo**

```bash
git clone https://github.com/mdhasanali39/library-management-server.git
cd library-management-server
```
2️⃣ ** Install dependencies **
```
 npm install
```
3️⃣ Create .env
```
  PORT=5000
  MONGO_URI=mongodb://localhost:27017/library

```
4️⃣ Run the server
```
npm run dev
```

📌 API Endpoints
✅ Create Book
POST /api/books
```json
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5
}
```
✅ Success Response
```
{
  "success": true,
  "message": "Book created successfully",
  "data": { ... }
}
```
✅ Get All Books
- GET /api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5
- filter: genre
- sortBy: field to sort by (default: createdAt)
- sort: asc or desc
- limit: number of results (default: 10)

✅ Get Book by ID
GET /api/books/:bookId

✅ Returns details of the specific book.

✅ Update Book
PUT /api/books/:bookId
```json
{
  "copies": 50
}
```
✅ Updates fields and re-validates schema.

✅ Delete Book
DELETE /api/books/:bookId

✅ Deletes a book by ID.

✅ Borrow a Book
POST /api/borrow
```
{
  "book": "BOOK_ID",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```
Checks if enough copies are available.

Deducts borrowed quantity.

Marks book as unavailable if no copies left.

✅ Success Response
```json
{
  "success": true,
  "message": "Book borrowed successfully",
  "data": { ... }
}
```

✅ Borrowed Books Summary
GET /api/borrow

Returns aggregated summary:
```
{
  "success": true,
  "message": "Borrowed books summary retrieved successfully",
  "data": [
    {
      "book": {
        "title": "The Theory of Everything",
        "isbn": "9780553380163"
      },
      "totalQuantity": 5
    }
  ]
}
```

🧑‍💻 Author
Md Hasan ali
[GitHub Profile]
