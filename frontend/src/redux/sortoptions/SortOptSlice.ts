import { createSlice } from "@reduxjs/toolkit";

const initialState: PopularSort = {
    type: "Hot",
    location: "Everywhere",
    view: "Card"
}

const SortOptSlice = createSlice({
    name: "sortopt",
    initialState,
    reducers:{
        changetype: (state, action) => {
            state.type = action.payload
        },
        changelocation: (state, action) => {
            state.location = action.payload
        },
        changeview: (state, action) => {
            state.view = action.payload
        }
    }
})

export default SortOptSlice.reducer
export const {changetype, changelocation, changeview} = SortOptSlice.actions