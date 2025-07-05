"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRouter = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = require("../models/book.model");
const sendError_1 = require("../../utils/sendError");
exports.bookRouter = express_1.default.Router();
// create book
exports.bookRouter.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const book = yield book_model_1.Book.create(body);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book,
        });
    }
    catch (error) {
        next(error);
    }
}));
// get all books
exports.bookRouter.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy, sort, limit = "10", page = "1" } = req.query;
        const query = {};
        if (filter) {
            query.genre = filter;
        }
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);
        const skip = (pageNumber - 1) * limitNumber;
        const total = yield book_model_1.Book.countDocuments(query);
        const totalPage = Math.ceil(total / limitNumber);
        const books = yield book_model_1.Book.find(query)
            .sort({ [sortBy]: sort === "desc" ? -1 : 1 }).skip(skip).limit(limitNumber);
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: books,
            pagination: {
                page: pageNumber,
                limit: limitNumber,
                total,
                totalPage,
            }
        });
    }
    catch (error) {
        next(error);
    }
}));
// get book by id
exports.bookRouter.get("/:bookId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    try {
        const book = yield book_model_1.Book.findById(bookId);
        if (!book) {
            return (0, sendError_1.sendError)(res, "Book not found", null, 404);
        }
        res.status(200).json({
            success: true,
            message: "Book retrieved successfully",
            data: book,
        });
    }
    catch (error) {
        next(error);
    }
}));
// update book by Id
exports.bookRouter.put("/:bookId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    const updatedBookData = req.body;
    try {
        const book = yield book_model_1.Book.findByIdAndUpdate(bookId, updatedBookData, {
            new: true,
            runValidators: true, // this is a new things for me, and its help us to enable validators to validate with schema
        });
        if (!book) {
            return (0, sendError_1.sendError)(res, "Book not found", null, 404);
        }
        yield (book === null || book === void 0 ? void 0 : book.updateBookAvailability());
        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: book,
        });
    }
    catch (error) {
        next(error);
    }
}));
// delete book by id
exports.bookRouter.delete("/:bookId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    try {
        const book = yield book_model_1.Book.findByIdAndDelete(bookId);
        if (!book) {
            return (0, sendError_1.sendError)(res, "Book not found", null, 404);
        }
        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: book,
        });
    }
    catch (error) {
        next(error);
    }
}));
