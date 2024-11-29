import { Request, Response, NextFunction } from "express";
import { AuthBody, AuthenticatedRequest, TokenData } from "../types";
import { errorHandler } from "../utils/errorHandler";
import { User } from "../models/User";
import argon2 from "argon2"
import { v4 as uuidv4 } from "uuid";
import { sendVerificationMail } from "../services/mailSender";
import jwt from "jsonwebtoken"
import { isFakeEmail } from "fakefilter";
import { isEmail, matches, isLength } from "validator";
import { Redis } from "../utils/Redis";

export const ACCESS_TOKEN_EXPIRY = 28 * 24 * 60 * 60
export const REFRESH_TOKEN_EXPIRY = 180 * 24 * 60 * 60

export const checkemail = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const { email } : AuthBody = req.body

        if(email){
            if(isEmail(email)){
                const user = await User.findOne({email: email})
                if(user){
                    res.status(409).json({res: "EMAIL_ALREADY_EXISTS", success: false})
                }
                else{
                    if(isFakeEmail(email)){
                        res.status(409).json({res: "TEMP_MAIL_DETECTED", success: false})
                    }
                    else{
                        if (req.route.path === "/checkemail") {
                            res.status(200).json({res: "NEW_VALID_EMAIL", success: true})
                        }
                        else{
                            next()
                        }
                    }
                }
            }
            else{
                res.status(409).json({res: "NOT_AN_EMAIL", success: false})
            }
        }
        else{
            next(errorHandler(400, "Invalid credential format"))
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
            if(matches(uname, "^[a-zA-Z0-9_\.\-]*$") && isLength(uname, {min: 3, max: 20})){
                const user = await User.findOne({uname: uname})

                if(user){
                    res.status(409).json({res: "UNAME_ALREADY_EXISTS", success: false})
                }
                else{
                    if (req.route.path === "/checkuname") {
                        res.status(200).json({res: "NEW_VALID_USERNAME", success: true})
                    }
                    else{
                        next()
                    }
                }
            }
            else{
                res.status(409).json({res: "INVALID_USERNAME_FORMAT", success: false})
            }
        }
        else{
            next(errorHandler(400, "Invalid credential format"))
        }
    }
    catch(err){
        return next(errorHandler)
    }
}

export const checkpassword = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const { password } : AuthBody = req.body
        if(password){
            const passcriteria = [
                'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
                'abcdefghijklmnopqrstuvwxyz',
                '0123456789',
                '!@#$%^&*()_+-=[]{}|\\:;\"\'<>,.?/'
            ]

            if(isLength(password, {min: 8, max: 256})){
                if(passcriteria.every(chars => {
                    return chars.split('').some(char => {return password.includes(char)})
                })){
                    if(req.route.path === "/checkpassword"){
                        res.status(200).json({res: "VALID_PASSWORD", success: true})
                    }
                    else{
                        next()
                    }
                }
                else{
                    res.status(409).json({res: "PW_CRITERIA_FAILURE", success: false})
                }
            }
            else{
                res.status(409).json({res: "PW_LENGTH_INVALID", success: false})
            }
        }
        else{
            next(errorHandler(400, "Invalid credential format"))
        }
    }
    catch(err){
        return next(errorHandler)
    }
}

export const signup = async (req: Request, res: Response, next: NextFunction) => {
    try{
        await checkemail(req, res, async () => {
            await checkuname(req, res, async() => {
                await checkpassword(req, res, async () => {
                    const { uname, email, password, fingerprint }: AuthBody = req.body

                    console.log("fingerprint of client: ", fingerprint)
                    
                    const hashPass = await argon2.hash(password)
                    
                    const uuid = uuidv4()
                    
                    const newuser = await User.create({uname, email, password: hashPass, uuid})
                    
                    sendVerificationMail(uuid, email!)
                    
                    let payload = {
                        id: newuser.id,
                        iss: "doublequotes"
                    }
                    // accessToken
                    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {expiresIn: ACCESS_TOKEN_EXPIRY})
                    const expiryDate = new Date(Date.now() + ACCESS_TOKEN_EXPIRY * 1000)

                    // refreshToken
                    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET as string, {expiresIn: '180d'})
                    const refresh_expiryDate = new Date(Date.now() + REFRESH_TOKEN_EXPIRY * 1000)

                    await Redis.set(fingerprint + "||" + newuser.id, refreshToken, REFRESH_TOKEN_EXPIRY)

                    const {password: pass, __v: v, uuid: uid, ...rest} = (newuser as any)._doc

                    res.cookie("accessToken", token, {httpOnly: true, expires: expiryDate})
                    res.cookie("refreshToken", refreshToken, {httpOnly: true, expires: refresh_expiryDate})
                    return res.status(200).json({success : true, ...rest})
                })
            })
        })
    }
    catch(err){
        return next(errorHandler)
    }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const { identifier, password, fingerprint} : AuthBody = req.body

        if(identifier && password){
            const unameUser = await User.findOne({uname: identifier})
            const emailUser = await User.findOne({email: identifier})

            let success = false
            let payload = {
                id: "",
                iss: "doublequotes"
            }

            let userData

            if(unameUser){
                const isPasswordValid = await argon2.verify(unameUser.password, password)
                if(!isPasswordValid) return next(errorHandler(401, "INVALID_PASSWORD"))

                payload.id = unameUser.id
                success = true
                const {password: pass, __v: v, uuid: uid, ...rest} = (unameUser as any)._doc
                userData = rest
            }
            else if(emailUser){
                const isPasswordValid = await argon2.verify(emailUser.password, password)
                if(!isPasswordValid) return next(errorHandler(401, "INVALID_PASSWORD"))

                payload.id = emailUser.id
                success = true
                const {password: pass, __v: v, uuid: uid, ...rest} = (emailUser as any)._doc
                userData = rest
            }
            else{
                return next(errorHandler(404, "USER_NOT_FOUND"))
            }

            if(success){

                // accessToken
                const token = jwt.sign(payload, process.env.JWT_SECRET as string, {expiresIn: ACCESS_TOKEN_EXPIRY})
                const expiryDate = new Date(Date.now() + ACCESS_TOKEN_EXPIRY * 1000)

                // refreshToken
                let refreshToken
                let refresh_expiryDate

                if(fingerprint){
                    const existingRefreshToken = await Redis.get(fingerprint + "||" + payload.id)

                    if(existingRefreshToken){
                        const decodedData = jwt.decode(existingRefreshToken as string) as TokenData

                        if(decodedData && decodedData.exp){
                            refresh_expiryDate = new Date(Date.now() + decodedData.exp * 1000)
                        }
                        refreshToken = existingRefreshToken
                    }
                    else{
                        refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET as string, {expiresIn: '180d'})
                        refresh_expiryDate = new Date(Date.now() + REFRESH_TOKEN_EXPIRY * 1000)
                    }
                }

                res.cookie("accessToken", token, {httpOnly: true, expires: expiryDate})
                res.cookie("refreshToken", refreshToken, {httpOnly: true, expires: refresh_expiryDate})
                
                res.status(200).json({success, ...userData})
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

export const testauthController = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try{
        const user = req.user

        if(user){
            res.json({success: true, user: user, userID: user.id})
        }
    }
    catch(err){
        return next(errorHandler)
    }
}

export const logout = async (req: Request, res: Response, next: NextFunction) => {
    try{
        ["accessToken", "refreshToken"].forEach(cookie => res.clearCookie(cookie))

        res.status(200).json({message: "LOGGED_OUT_SUCCESSFULLY"})
    }
    catch(err){
        return next(errorHandler)
    }
}