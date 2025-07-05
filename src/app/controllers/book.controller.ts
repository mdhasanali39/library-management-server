import express, { NextFunction, Request, Response } from "express";
import { Book } from "../models/book.model";
import { sendError } from "../../utils/sendError";

export const bookRouter = express.Router();

// create book
bookRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    try {
      const book = await Book.create(body);
      res.status(201).json({
        success: true,
        message: "Book created successfully",
        data: book,
      });
    } catch (error) {
      next(error);
    }
  }
);

// get all books
bookRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { filter, sortBy, sort, limit = "10", page = "1" } = req.query;
    const query: any = {};

    if (filter) {
      query.genre = filter;
    }

    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);
    const skip = (pageNumber - 1) * limitNumber;

    const total = await Book.countDocuments(query);
    const totalPage = Math.ceil(total / limitNumber);

    const books = await Book.find(query)
      .sort({ [sortBy as string]: sort === "desc" ? -1 : 1 }).skip(skip)
      .limit(Number(limit));
    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
      pagination:{
        page: pageNumber,
        limit: limitNumber,
        total,
        totalPage,
      }
    });
  } catch (error) {
    next(error);
  }
});

// get book by id
bookRouter.get(
  "/:bookId",
  async (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.bookId;
    try {
      const book = await Book.findById(bookId);
      if(!book) {
        return sendError(res, "Book not found", null, 404);
      }
      res.status(200).json({
        success: true,
        message: "Book retrieved successfully",
        data: book,
      });
    } catch (error) {
      next(error);
    }
  }
);

// update book by Id
bookRouter.put(
  "/:bookId",
  async (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.bookId;
    const updatedBookData = req.body;
    try {
      const book = await Book.findByIdAndUpdate(bookId, updatedBookData, {
        new: true,
        runValidators:true, // this is a new things for me, and its help us to enable validators to validate with schema
      });
      if (!book) {
        return sendError(res, "Book not found", null, 404);
      }
      await book?.updateBookAvailability();
      res.status(200).json({
        success: true,
        message: "Book updated successfully",
        data: book,
      });
    } catch (error) {
      next(error);
    }
  }
);

// delete book by id
bookRouter.delete(
  "/:bookId",
  async (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.bookId;
    try {
      const book = await Book.findByIdAndDelete(bookId);

      if (!book) {
        return sendError(res, "Book not found", null, 404);
      }

      res.status(200).json({
        success: true,
        message: "Book deleted successfully",
        data: book,
      });
    } catch (error) {
      next(error);
    }
  }
);
