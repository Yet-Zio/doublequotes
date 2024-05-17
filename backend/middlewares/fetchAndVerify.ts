import jwt from "jsonwebtoken"
import { errorHandler } from "../utils/errorHandler"
import { NextFunction, Response } from "express"
import { AuthenticatedRequest } from "../types"

export const fetchAndVerify = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.accessToken

    if(!token){
        next(errorHandler(401, "Unauthorized"))
    }
    else{
        jwt.verify(token , process.env.JWT_SECRET as string , (err: any , user: any) => {
            if(err.name === "TokenExpiredError"){
                next(errorHandler(401, "Unauthorized: Expired token"))
            }
            else{
                next(errorHandler(400, "Invalid token"))
            }
    
            req.user = user; 
    
            next();
        })
    }
}
