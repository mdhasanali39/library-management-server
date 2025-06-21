import express, { ErrorRequestHandler, NextFunction, Request, Response } from "express"
import cors from "cors"
import { bookRouter } from "./app/controllers/book.controller";
import { borrowRouter } from "./app/controllers/borrow.controller";


const app = express();

// middleware
app.use(express.json());
// app.use(express.urlencoded({extended: true}));
app.use(cors());

// routes 
app.use("/api/books", bookRouter);
app.use("/api/borrow", borrowRouter);

// health check
app.get("/", (req, res) =>{
    res.send("Library Management server in running well");
})  

// global error handler
app.use((error: any, req: Request, res:Response, next:NextFunction)=>{
    res.status(500).json({
        success: false,
        message: error.message,
        error: error
    })
})

export default app