import { ModalWidows } from "../Assets/enums";
import { UserDataType } from "../types";
import { configureStore } from "@reduxjs/toolkit";
import { MainDataReducer } from "./reducers/mainDataReducer";

// export const data = {
//     userData: null as UserDataType|null,
//     trackers: [
//         {trackerID: 1, trackerColor: "#82DB86", img: "https://svgshare.com/i/xmB.svg", trackerName: "Training Tracker"},
//         {trackerID: 2, trackerColor: "#1380DC", img: "https://svgshare.com/i/xmd.svg", trackerName: "Water Tracker"},
//         {trackerID: 3, trackerColor: "#EF3535", img: "https://svgshare.com/i/xjd.svg", trackerName: "Weight Tracker"},
//         {trackerID: 4, trackerColor: "#FA9D48", img: "https://svgshare.com/i/xmC.svg", trackerName: "Food Tracker"}
//     ]
// }

export const store = configureStore({
    reducer: { 
        mainData: MainDataReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const data = {
    userData: null as UserDataType|null, 
}

export const setUserData = (newUserData: UserDataType) => { data.userData = newUserData }