import cron from "node-cron"
import dotenv from "dotenv"
dotenv.config({path: "./config/.env.backend"})

import { connectToMongo } from "../config/db"
import { User } from "../models/User"

connectToMongo()

console.log("\nRunning cron job: Remove unverified users\nThis job removes user accounts that have not been verified in one day.")

cron.schedule("0 0 * * *", async () => {
    try {
        const oneDayAgo = new Date();
        oneDayAgo.setDate(oneDayAgo.getDate() - 1) // Set one day ago

        const unverifiedUsers = await User.find({
            verified: false,
            createdAt: {$lt: oneDayAgo}
        });

        if(unverifiedUsers.length > 0){
            await User.deleteMany({
                verified: false,
                createdAt: {$lt: oneDayAgo}
            });

            console.log(`${unverifiedUsers.length} unverified users deleted.`);
        }

    } catch (error) {
        console.error("Error deleting unverified users:", error);
    }
})