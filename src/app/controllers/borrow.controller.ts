import express, { Request, Response } from "express";
import { Book } from "../models/book.model";
import { Borrow } from "../models/borrow.model";

export const borrowRouter = express.Router();

// create borrow
borrowRouter.post("/", async (req: Request, res: Response) => {
  const { book: bookId, quantity, dueDate } = req.body;
  try {
    const book: any = await Book.findById(bookId);
    if (!book) {
      res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }
    if (quantity > book.copies) {
      res.status(400).json({
        success: false,
        message: "Not enough copies",
      });
    }

    const borrow = await Borrow.create({ book: bookId, quantity, dueDate });
    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrow,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in deleting book",
      error: error,
    });
  }
});

borrowRouter.get("/", async (req: Request, res: Response) => {
  const summary = await Borrow.aggregate([
    {
      $group: {
        _id: "$book",
        totalQuantity: { $sum: "$quantity" },
      },
    },
    {
      $lookup: {
        from: "books",
        localField: "_id",
        foreignField: "_id",
        as: "bookrr",
      },
    },
    {
      $unwind: "$bookrr",
    },
    {
      $project: {
        book: {
          title: "$bookrr.title",
          isbn: "$bookrr.isbn",
        },
        _id: 0,
        totalQuantity: 1,
      },
    },
    {
      $sort: { totalQuantity: -1 },
    },
  ]);

  res.status(200).json({
    success: true,
    message: "Borrowed books summary retrieved successfully",
    data: summary,
  });
});
