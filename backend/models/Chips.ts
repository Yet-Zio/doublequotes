import mongoose, {Schema} from "mongoose"

export enum QUOTECHIPTYPE{
    COMMON = 1, // 100 approvals on a post/comment
    RARE = 2, // 1000 approvals on a post/comment
    EPIC = 3, // 10000 approvals on a post/comment
    LEGENDARY = 4, // requires 5 epic chips
    MYTHICAL = 5, // requires 5 legendary chips
    DIVINE = 6, // requires 5 mythical chips
    COSMIC = 10 // requires 10 divine chips (impossible... i think)
}

const chipSchema = new Schema({
    chipid:{
        type: Number,
        required: true,
        unique: true
    },
    chipname:{
        type: String,
        required: true,
        unique: true,
    },
    value:{
        type: QUOTECHIPTYPE,
        default: QUOTECHIPTYPE.COMMON,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ""
    },
})

export const Chip = mongoose.model("Chips", chipSchema)