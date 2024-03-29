import { TypedUseSelectorHook, useSelector, useDispatch} from "react-redux";
import type { RootState, AppDispatch } from "./store";

export const useDQSelector: TypedUseSelectorHook<RootState> = useSelector
export const useDQDispatch = () => useDispatch<AppDispatch>()