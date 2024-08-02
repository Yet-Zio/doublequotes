import { Request } from "express";

export interface AuthBody {
    uname?: string;
    email?: string;
    password: string;
    identifier?: string; 
}

export interface AuthenticatedRequest extends Request{
    user?: any
}

export interface SendMail {
    uuid: string
}