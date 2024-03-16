import mongoose from "mongoose";

export const connectToMongo = async () => {
    const mongoURI: string  = process.env.MONGOURI!
    mongoose.connect(mongoURI)
        .then(success => {
            console.log("Connected to MongoDB successfully!\nDB:", success.connection.name)
        })
        .catch(err => {
            console.log("Error: Could not connect to MongoDB!", err.message)
        })
}