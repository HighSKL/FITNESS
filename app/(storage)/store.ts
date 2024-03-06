import { configureStore } from "@reduxjs/toolkit";
import { MainDataReducer } from "./reducers/mainDataReducer";
import { userDataReducer } from "./reducers/userDataReducer";

export const store = configureStore({
    reducer: { 
        mainData: MainDataReducer,
        userData: userDataReducer
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch