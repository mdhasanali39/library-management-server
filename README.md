# 📚 Library Management Server

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
- **Validation & Business Logic:** Mongoose schema, validators, instance methods, middleware.

---

## 📁 Project Structure

📁 node_modules <br>
📁 src <br>
 └── 📁 app <br>
      ├── 📁 controllers <br>
      │     ├── 📄 book.controller.ts <br>
      │     └── 📄 borrow.controller.ts <br>
      ├── 📁 interfaces <br>
      │     ├── 📄 book.interface.ts <br>
      │     └── 📄 borrow.interface.ts <br>
      ├── 📁 models <br>
      │     ├── 📄 book.model.ts <br>
      │     └── 📄 borrow.model.ts <br>
      ├── 📁 utils <br>
      ├── 📄 app.ts <br>
      └── 📄 server.ts <br>
📄 .env <br>
📄 .gitignore <br>
📄 package-lock.json <br>
📄 package.json <br>
📄 tsconfig.json <br>
---

## 🚀 Setup Instructions

1️⃣ **Clone the repo**

```bash
git clone https://github.com/mdhasanali39/library-management-server.git
```
```bash
cd library-management-server
```
2️⃣ **Install dependencies**
```bash
 npm install
```
3️⃣ Create .env
```bash
  PORT=3000
  MONGO_URI=mongodb://localhost:27017/library

```
4️⃣ **Run the server**
```bash
npm run start:dev
```

📌 **API Endpoints** <br>
✅ Create Book <br>
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
```json
{
  "success": true,
  "message": "Book created successfully",
  "data": { ... }
}
```
✅ Get All Books <br>
GET /api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5
- filter: genre
- sortBy: field to sort by (default: createdAt)
- sort: asc or desc
- limit: number of results (default: 10)

✅ Get Book by ID <br>
  GET /api/books/:bookId

- Returns details of the specific book. <br>

✅ Update Book <br>
PUT /api/books/:bookId
```json
{
  "copies": 50
}
```
- Updates fields and re-validates schema. <br> <br>

✅ Delete Book <br>
DELETE /api/books/:bookId <br>

- Deletes a book by ID. <br>

✅ Borrow a Book <br>
POST /api/borrow
```json
{
  "book": "BOOK_ID",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```
- Checks if enough copies are available.

- Deducts borrowed quantity.

- Marks book as unavailable if no copies left.

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
```json
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

🧑‍💻 Author <br>
Md Hasan ali <br>
[GitHub Profile](https://github.com/mdhasanali39)
