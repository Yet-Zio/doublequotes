import { NextFunction, Request, Response, ErrorRequestHandler } from "express";

class APIError extends Error{
    constructor(public statusCode: number, message: string){
        super(message)
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

export const errorHandler = (statusCode: number, message: string) => {
    statusCode = statusCode || 500
    message = message || "XoX: Internal Server Error"

    const error = new APIError(statusCode, message)
    return error
}

export const serverErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "XoX: Internal Server Error";

    res.status(statusCode).json({
        err: "＞﹏＜: Error Occured",
        statusCode,
        message
    });
};
