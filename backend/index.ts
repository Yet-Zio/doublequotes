import express, { Express, Request, Response} from "express";
import dotenv from "dotenv"
import compression from "compression";
import serverCors from "./utils/cors";
import cookieParser from "cookie-parser";

dotenv.config({path: "./config/.env.backend"})

import { connectToMongo } from "./config/db";
import { authRouter } from "./routes/authRoute";
import { verifyRouter } from "./routes/verifyRoute"
import { serverErrorHandler } from "./utils/errorHandler";

async function startServer(){
    const app: Express = express()
    const port: string | number = process.env.PORT || 3000

    app.use(serverCors)
    app.use(express.json())
    app.use(cookieParser())
    app.use(compression())

    await connectToMongo()

    app.get("/", (req: Request, res: Response) => {
        res.send("(⓿_⓿): Hello, you are communicating with DoubleQuotes.")
    })

    app.use("/api/auth", authRouter)
    app.use("/api/account", verifyRouter)

    app.use(serverErrorHandler)

    app.listen(port, () => {
        console.log(`[server]: Server has started running on http://localhost:${port}`)
    })
}

startServer()