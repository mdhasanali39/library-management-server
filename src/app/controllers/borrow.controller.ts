import express from "express";
import { Book } from "../models/book.model";
import { Borrow } from "../models/borrow.model";

export const borrowRouter = express.Router();

borrowRouter.post("/", async(req, res)=>{
  const {book: bookId, quantity, dueDate} = req.body;
    try {
        const book: any = await Book.findById(bookId);
        if(!book){
          res.status(404).json({
            success: false,
            message: "Book not found"
          })
        }
        if(quantity > book.copies){
          res.status(400).json({
            success: false,
            message: "Not enough copies"
          })
        }

        const borrow = await Borrow.create({book: bookId, quantity, dueDate})
        res.status(201).json({
          success: true,
          message: "Book borrowed successfully",
          data: borrow
        })

    } catch (error) {
        res.status(500).json({
          success: false,
          message: "Error in deleting book",
          error: error,
        });
    }
})