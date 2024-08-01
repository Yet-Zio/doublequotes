import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    headerShown: true
}

const headerSlice = createSlice({
    name: 'header',
    initialState,
    reducers: {
        setHeader: (state, action) => {
            state.headerShown = action.payload
        }
    }
})

export default headerSlice.reducer
export const { setHeader } = headerSlice.actions