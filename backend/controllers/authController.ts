import { Request, Response, NextFunction } from "express";
import { AuthBody } from "../types";
import { errorHandler } from "../utils/errorHandler";
import { User } from "../models/User";
import argon2 from "argon2"
import { v4 as uuidv4 } from "uuid";
import { sendVerificationMail } from "../services/mailSender";
import jwt from "jsonwebtoken"
import { isFakeEmail } from "fakefilter";

export const signup = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const { uname, email, password }: AuthBody = req.body

        if(uname && email && password){
            const unameCheck = await User.findOne({uname})
            const emailCheck = await User.findOne({email})
            if(!(unameCheck || emailCheck)){
                if(isFakeEmail(email)){
                    return next(errorHandler(400, "Sorry, temporary or disposable emails are not allowed!"))
                }

                const hashPass = await argon2.hash(password)

                const uuid = uuidv4()

                const newuser = await User.create({uname, email, password: hashPass, uuid})

                sendVerificationMail(uuid, email)

                let payload = {
                    id: newuser.id
                }

                const token = jwt.sign(payload, process.env.JWT_SECRET as string, {expiresIn: 2 * 24 * 60 * 60})

                return res.cookie("accessToken", token, {httpOnly: true}).status(200).json({success: true})
            }
            else{
                return next(errorHandler(409, "User already exists!"))
            }
        }
        else{
            return next(errorHandler(400, "Invalid credential format"))
        }
    }
    catch(err){
        return next(errorHandler)
    }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const { identifier, password } : AuthBody = req.body

        if(identifier && password){
            const unameUser = await User.findOne({uname: identifier})
            const emailUser = await User.findOne({email: identifier})

            let success = false
            let payload = {
                id: ""
            }

            if(unameUser){
                const isPasswordValid = await argon2.verify(unameUser.password, password)
                if(!isPasswordValid) return next(errorHandler(401, "Invalid Password!"))
                payload.id = unameUser.id
                success = true
            }
            else if(emailUser){
                const isPasswordValid = await argon2.verify(emailUser.password, password)
                if(!isPasswordValid) return next(errorHandler(401, "Invalid Password!"))
                payload.id = emailUser.id
                success = true
            }
            else{
                return next(errorHandler(404, "User not found!"))
            }

            if(success){
                const token = jwt.sign(payload, process.env.JWT_SECRET as string, {expiresIn: 2 * 24 * 60 * 60})
                return res.cookie("accessToken", token, {httpOnly: true}).status(200).json({success})
            }
            else{
                return next(errorHandler(500, "Something went wrong"))
            }
        }
        else{
            return next(errorHandler(400, "Invalid credential format"))
        }
    }
    catch(err){
        return next(errorHandler)
    }
}

export const checkemail = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const { email } : AuthBody = req.body

        if(email){
            const user = await User.findOne({email: email})

            if(user){
                return res.status(409).json({res: "EMAIL_ALREADY_EXISTS", success: false})
            }
            else{
                return res.status(200).json({res: "NEW_CREDENTIAL", success: true})
            }
        }
        else{
            return next(errorHandler(400, "Invalid credential format"))
        }
    }
    catch(err){
        return next(errorHandler)
    }
}

export const checkuname = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const { uname } : AuthBody = req.body

        if(uname){
            const user = await User.findOne({email: uname})

            if(user){
                return res.status(409).json({res: "UNAME_ALREADY_EXISTS", success: false})
            }
            else{
                return res.status(200).json({res: "NEW_CREDENTIAL", success: true})
            }
        }
        else{
            return next(errorHandler(400, "Invalid credential format"))
        }
    }
    catch(err){
        return next(errorHandler)
    }
}