import mongoose from "mongoose";

export const connectToMongo = async () => {
    const mongoURI: string  = (process.env.IN_DOCKER === "true" ? process.env.DOCKER_MONGOURI : process.env.MONGOURI) as string
    
    mongoose.connect(mongoURI)
        .then(success => {
            console.log("Connected to MongoDB successfully!\nDB:", success.connection.name)
        })
        .catch(err => {
            console.log("Error: Could not connect to MongoDB!", err.message)
        })
}