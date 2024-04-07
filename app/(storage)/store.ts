import { configureStore } from "@reduxjs/toolkit";
import { MainDataReducer } from "./reducers/mainDataReducer";
import { userDataReducer } from "./reducers/userDataReducer";
import { userAPI } from "../( RestApi )/api_services/customServices";

export const store = configureStore({
    reducer: { 
        mainData: MainDataReducer,
        userData: userDataReducer,
        [userAPI.reducerPath]: userAPI.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userAPI.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch