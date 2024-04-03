import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    uname: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    uuid: {
        type: String,
        unique: true,
        default: ""
    },
    quotechips:{
        type: Number,
        default: 0
    },
    avatar: {
        type: String,
        default: "https://github.com/identicons/example.png"
    }
}, {timestamps: true})

export const User = mongoose.model("Users", userSchema)