import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/errorHandler";
import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "../types";
import { ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY } from "../controllers/authController";
import { Redis } from "../utils/Redis";
import { createSimpleLogger } from "simple-node-logger";
import { existsSync, mkdirSync } from "fs";

const checkTokenErrLogExistence = () => {
    if(!existsSync('./logs/tokens')){
        mkdirSync('./logs/tokens', { recursive: true })
    }
}

enum TOKEN_EXISTENCE {
    BOTH_UNDEFINED = 0,
    NO_ACCESS_TOKEN = 1,
    NO_REFRESH_TOKEN = 2,
    DEFINED = 3,
}

export const fetchAndVerify = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;
    const fingerprint = req.headers["fingerprint"] as string;

    let status = TOKEN_EXISTENCE.DEFINED;

    if (!accessToken && !refreshToken) {
        status = TOKEN_EXISTENCE.BOTH_UNDEFINED;
    } else if (!accessToken) {
        status = TOKEN_EXISTENCE.NO_ACCESS_TOKEN;
    } else if (!refreshToken) {
        status = TOKEN_EXISTENCE.NO_REFRESH_TOKEN;
    }

    try {
        if (status === TOKEN_EXISTENCE.BOTH_UNDEFINED) {
            throw errorHandler(401, "Unauthorized");
        } else if (status === TOKEN_EXISTENCE.NO_ACCESS_TOKEN) {

            const user = await verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET as string);
            req.user = user;

            await regenerateAccessToken(req, res, user);

        } else if (status === TOKEN_EXISTENCE.NO_REFRESH_TOKEN) {

            const user = await verifyToken(accessToken, process.env.JWT_SECRET as string);
            req.user = user;
            await regenerateRefreshToken(req, res, user, fingerprint);

        } else {
            const user = await verifyToken(accessToken, process.env.JWT_SECRET as string);
            req.user = user;
        }

        next();
    } catch (err) {
        return next(errorHandler);
    }
};

const verifyToken = (token: string, secret: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err: any, decoded: any) => {
            if (err) {
                checkTokenErrLogExistence()

                const errSrvLog = createSimpleLogger('./logs/tokens/tokenErrValidation.log')
                
                errSrvLog.error("Token verification error ", new Date().toLocaleString(), ` - REASON: Token verification failed ${err.message}`)
                
                if (err.name === "TokenExpiredError") {
                    reject(errorHandler(401, "Token expired. Please relogin."));
                } else {
                    reject(errorHandler(401, "Invalid token."));
                }
            } else {
                resolve(decoded);
            }
        });
    });
};

const regenerateAccessToken = async (req: AuthenticatedRequest, res: Response, user: any) => {
    const payload = { id: user.id, iss: "doublequotes" };
    const newToken = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: ACCESS_TOKEN_EXPIRY });
    const expiryDate = new Date(Date.now() + ACCESS_TOKEN_EXPIRY * 1000);

    res.cookie("accessToken", newToken, { httpOnly: true, expires: expiryDate });
    req.cookies.accessToken = newToken;
};


const regenerateRefreshToken = async (req: AuthenticatedRequest, res: Response, user: any, fingerprint: string) => {
    const payload = { id: user.id, iss: "doublequotes" };
    const newToken = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: REFRESH_TOKEN_EXPIRY });
    const expiryDate = new Date(Date.now() + REFRESH_TOKEN_EXPIRY * 1000);

    if (fingerprint) {
        await Redis.set(`${fingerprint}||${user.id}`, newToken, REFRESH_TOKEN_EXPIRY);
    }

    res.cookie("refreshToken", newToken, { httpOnly: true, expires: expiryDate });
    req.cookies.refreshToken = newToken;
};
