import { configureStore } from "@reduxjs/toolkit";
import sideoptReducer from "./sidebar/SideOptSlice";

const store = configureStore({
    reducer: {
        sideopt: sideoptReducer
    }
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch