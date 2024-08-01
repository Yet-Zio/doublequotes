import { Tuple, combineReducers, configureStore } from "@reduxjs/toolkit";
import sideoptReducer from "./sidebar/SideOptSlice";
import sortoptReducer from "./sortoptions/SortOptSlice";
import userReducer from "./user/userSlice"
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { thunk } from "redux-thunk";
import headerReducer from "./header/headerSlice";

const rootConfig = {
    key: 'root',
    storage,
    safelist: ['user'],
    blacklist: ['sortopt', 'sideopt', 'header']
}

const rootReducer = combineReducers({
    user: userReducer,
    sideopt: sideoptReducer,
    sortopt: sortoptReducer,
    header: headerReducer
})

const persistedReducer = persistReducer(rootConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: () => new Tuple(thunk)
})

export default store
export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch