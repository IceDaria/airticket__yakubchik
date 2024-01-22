import {combineReducers, configureStore} from "@reduxjs/toolkit";
import contentReduser from "./shared/Redusers/contentReduser";
import filtersReducer from "./shared/Redusers/filtersReducer";

const rootReducer = combineReducers({
    tickets: contentReduser,
    filter: filtersReducer
})

export const store = configureStore({
    reducer: rootReducer,
})

export type RootState = ReturnType<typeof rootReducer>;