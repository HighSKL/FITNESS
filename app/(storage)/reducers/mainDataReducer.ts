import { ModalWidows } from "@/app/Assets/enums";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    trackers: [
        {trackerID: 1, trackerColor: "#82DB86", icon: "🏃‍♀️", trackerName: "Training Tracker", windowType: ModalWidows.TrainingWindow},
        {trackerID: 2, trackerColor: "#1380DC", icon: "💧", trackerName: "Water Tracker", windowType: ModalWidows.WaterWindow},
        {trackerID: 3, trackerColor: "#EF3535", icon: "⚖️", trackerName: "Weight Tracker", windowType: ModalWidows.WeightWindow},
        {trackerID: 4, trackerColor: "#FA9D48", icon: "🥗", trackerName: "Food Tracker", windowType: ModalWidows.FoodWindow}
    ]
}

const reducer = createSlice({
    name: 'mainData',
    initialState,
    reducers: {
        
    }
})

export const {} = reducer.actions

export const MainDataReducer = reducer.reducer
