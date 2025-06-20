import mongoose, { Model, Schema } from "mongoose";
import { IBook, instanceMethods } from "../interfaces/book.interface";

const bookSchema = new Schema<IBook, Model<IBook>, instanceMethods>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: [
      "FICTION",
      "NON_FICTION",
      "SCIENCE",
      "HISTORY",
      "BIOGRAPHY",
      "FANTASY",
    ],
    isbn: { type: String, required: true, unique: true },
    description: { type: String, default: "" },
    copies: { type: Number, required: true, default: 0 },
    available: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);


bookSchema.method(
  "updateBookAvailability",
  function updateBookAvailability(available: boolean) {
    this.available = false;
    this.save();
    return "Book availability updated to false successfully";
  }
);

export const Book = mongoose.model("Book", bookSchema);