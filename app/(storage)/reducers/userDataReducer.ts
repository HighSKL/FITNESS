import { UserDataType } from "@/app/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null as UserDataType|null, 
}

const reducer = createSlice({
    name: 'userData',
    initialState,
    reducers:{
        setUserData: (state, action) => { state.user = action.payload}
    }
})

export const { setUserData } = reducer.actions

export const userDataReducer = reducer.reducer