import { Request, Response } from "express";

export const sendError = (res: Response, message: string, error: any) =>{
    res.status(error.code || 400).json({
        success: false,
        message: message,
        error: error
    })
}