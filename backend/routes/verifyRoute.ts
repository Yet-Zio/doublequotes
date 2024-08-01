import { NextFunction, Request, Response, Router } from "express";
import { errorHandler } from "../utils/errorHandler";
import { User } from "../models/User";

export const verifyRouter = Router();

verifyRouter.get(
  "/verify-email",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.query.token as string;

      if (token) {
        const user = await User.findOne({ uuid: token });

        if (!user) {
          next(errorHandler(404, "USER_NOT_FOUND"));
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
        next(errorHandler(400, "TOKEN_NOT_FOUND"));
      }
    } catch (err) {
        next(errorHandler);
    }
  }
);
