import { Router } from "express";
import { checkemail, checkpassword, checkuname, login, signup } from "../controllers/authController";

export const authRouter = Router()

authRouter.post("/signup", signup)
authRouter.post("/login", login)
authRouter.post("/checkemail", checkemail)
authRouter.post("/checkuname", checkuname)
authRouter.post("/checkpassword", checkpassword)