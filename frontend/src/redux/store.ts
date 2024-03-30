import { configureStore } from "@reduxjs/toolkit";
import sideoptReducer from "./sidebar/SideOptSlice";
import sortoptReducer from "./sortoptions/SortOptSlice";

const store = configureStore({
    reducer: {
        sideopt: sideoptReducer,
        sortopt: sortoptReducer
    }
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch