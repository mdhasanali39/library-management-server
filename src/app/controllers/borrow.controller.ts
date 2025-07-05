import express, { NextFunction, Request, Response } from "express";
import { Book } from "../models/book.model";
import { Borrow } from "../models/borrow.model";
import { sendError } from "../../utils/sendError";

export const borrowRouter = express.Router();

// create borrow
borrowRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const { book: bookId, quantity, dueDate } = req.body;
  try {
    const book: any = await Book.findById(bookId);
    if (!book) {
      return sendError(res, "Book not found", null, 404);
    }
    if (quantity > book.copies) {
      return sendError(res, "Not enough copies available", null, 400);
    }

    const borrow = await Borrow.create({ book: bookId, quantity, dueDate });
    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrow,
    });
  } catch (error) {
    next(error);
  }
});

borrowRouter.get("/", async (req: Request, res: Response) => {

  const { page = "1", limit = "10" } = req.query;

    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);
    const skip = (pageNumber - 1) * limitNumber;

    // get the total count
    const totalResult = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      }
    ]);
    const total = totalResult.length;
    const totalPage = Math.ceil(total / limitNumber);

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
        as: "book",
      },
    },
    {
      $unwind: "$book",
    },
    {
      $project: {
        book: {
          title: "$book.title",
          isbn: "$book.isbn",
        },
        _id: 0,
        totalQuantity: 1,
      },
    },
    {
      $sort: { totalQuantity: -1 },
    },
    {
      $skip: skip,
    },
    {
      $limit: limitNumber,
    },
  ]);

  res.status(200).json({
    success: true,
    message: "Borrowed books summary retrieved successfully",
    data: summary,
    pagination: {
      page: pageNumber,
      limit: limitNumber,
      total,
      totalPage,
    },
  });
});
