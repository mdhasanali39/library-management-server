import express, { NextFunction, Request, Response } from "express";
import { Book } from "../models/book.model";
import { sendError } from "../../utils/sendError";

export const bookRouter = express.Router();

// create book
bookRouter.post("/", async (req: Request, res: Response, next:NextFunction) => {
  const body = req.body;
  try {
    const book = await Book.create(body);
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error) {
    sendError(res, "Validation Failed", error);
  }
});

// get all books
bookRouter.get("/", async (req: Request, res: Response) => {
  const { filter, sortBy, sort, limit } = req.query;
  const query: any = {};
  if (filter) {
    query.genre = filter;
  }
  try {
    const books = await Book.find(query)
      .sort({ [sortBy as string]: sort === "desc" ? -1 : 1 })
      .limit(Number(limit));
    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in retrieving books",
      error: error,
    });
  }
});

// get book by id
bookRouter.get("/:bookId", async (req: Request, res: Response) => {
  const bookId = req.params.bookId;
  try {
    const book = await Book.findById(bookId);
    res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in retrieving book",
      error: error,
    });
  }
});

// update book by Id
bookRouter.put("/:bookId", async (req: Request, res: Response) => {
  const bookId = req.params.bookId;
  const updatedBookData = req.body;
  try {
    const book = await Book.findByIdAndUpdate(bookId, updatedBookData, {
      new: true,
    });
    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in updating book",
      error: error,
    });
  }
});

// delete book by id
bookRouter.delete("/:bookId", async (req: Request, res: Response) => {
  const bookId = req.params.bookId;
  try {
    const book = await Book.findByIdAndDelete(bookId);
    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in deleting book",
      error: error,
    });
  }
});
