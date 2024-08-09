import { NextFunction, Request, Response, Router } from "express";
import { errorHandler } from "../utils/errorHandler";
import { User } from "../models/User";
import { VerifyBody } from "../types";
import { sendVerificationMail } from "../services/mailSender";
import { v4 as uuidv4 } from "uuid"

export const verifyRouter = Router();

verifyRouter.get(
  "/verify-email",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.query.token as string;

      if (token) {
        const user = await User.findOne({ uuid: token });

        if (!user) {
          return next(errorHandler(404, "USER_NOT_FOUND"));
        } else {
          if(user.verified){
            return res
            .status(200)
            .json({ success: true, server: "ALREADY_VERIFIED", message: "Email is already verified." });
          }

          user.verified = true;
          await user.save();
          return res
            .status(200)
            .json({ success: true, server: "VERIFIED_SUCCESS", message: "Email verified successfully!" });
        }
      } else {
        return next(errorHandler(400, "TOKEN_NOT_FOUND"));
      }
    } catch (err) {
        return next(errorHandler);
    }
  }
)

verifyRouter.post("/resend-ver-email", async (req: Request, res: Response, next: NextFunction) => {

  try{
    const { email } : VerifyBody = req.body

    if(email){
      const useracc = await User.findOne({ email })

      if(!useracc){
        return next(errorHandler(404, "USER_NOT_FOUND"))
      }
      else{
        if(useracc.verified){
          return res.status(200).json({ success: true, server: 'ALREADY_VERIFIED', message: 'Email is already verified.'})
        }
        else{
          const newuuid = uuidv4()
          useracc.uuid = newuuid
          await useracc.save()

          await sendVerificationMail(newuuid, email)
          return res.status(200).json({ success: true, server: "RESEND_VER_SUCCESS", message: "Verification mail resend successfully!" })
        }
      }
    }
    else{
      return next(errorHandler(400, "RESEND_PARAM_MISSING"));
    }  
  }
  catch(err){
    return next(errorHandler)
  }
})
