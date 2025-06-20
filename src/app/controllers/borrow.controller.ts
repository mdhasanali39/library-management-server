import express from "express";

export const borrowRouter = express.Router();

borrowRouter.post("/", async(req, res)=>{
    try {
        
    } catch (error) {
        res.status(500).json({
          success: false,
          message: "Error in deleting book",
          error: error,
        });
    }
})