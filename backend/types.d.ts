import { Request } from "express";

export interface AuthBody {
    uname?: string;
    email?: string;
    password: string;
    identifier?: string;
    fingerprint?: string;
}

export interface AuthenticatedRequest extends Request{
    user?: any,
    regen?: boolean
}

export interface VerifyBody{
    uname?: string
    email?: string
}

export interface TokenData{
    exp?: number
}