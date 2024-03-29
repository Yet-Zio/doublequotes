import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
    option: SideOptions
}

const initialState: InitialState = {
    option: "Trending"
}

const SideOptSlice = createSlice({
    name: 'sideopt',
    initialState,
    reducers: {
        change: (state, action) => {
            state.option = action.payload
        }
    }
})

export default SideOptSlice.reducer
export const { change } = SideOptSlice.actions