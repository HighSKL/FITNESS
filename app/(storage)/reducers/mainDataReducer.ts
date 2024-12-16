import { ModalWidows } from "@/app/Assets/enums";
import { createSlice } from "@reduxjs/toolkit";

import wellcomeImg from '@/imgs/courses_bg/bg_wellcome.png'

const initialState = {
    trackers: [
        { trackerID: 1, trackerColor: "#82DB86", icon: "🏃‍♀️", trackerName: "Training Tracker", windowType: ModalWidows.TrainingWindow, progress: { need: 10, done: 10} },
        { trackerID: 2, trackerColor: "#1380DC", icon: "💧", trackerName: "Water Tracker", windowType: ModalWidows.WaterWindow, progress: { need: 5, done: 1} },
        { trackerID: 3, trackerColor: "#EF3535", icon: "⚖️", trackerName: "Weight Tracker", windowType: ModalWidows.WeightWindow, progress: { need: 5, done: 3} },
        { trackerID: 4, trackerColor: "#FA9D48", icon: "🥗", trackerName: "Food Tracker", windowType: ModalWidows.FoodWindow, progress: { need: 7, done: 7} }
    ],
    courses: {
        available: [
            { id: 1, name: "Давайте знакомиться!)", link:'/courses/wellcome', bgColor: "#B8B8B8", bgImg: wellcomeImg.src }
        ],
        archived: [

        ]
    }
}

const reducer = createSlice({
    name: 'mainData',
    initialState,
    reducers: {
        archiveCourse: (state, action) => {},
        setTrackersCount: (state, action) => {
            state.trackers =
                state.trackers.map((tracker) =>{

                    if(tracker.trackerID !== action.payload.trackerId)
                        return tracker

                    tracker.progress.need = action.payload.need
                    tracker.progress.done = action.payload.done

                    return tracker
                })
        }
    }
})

export const { archiveCourse, setTrackersCount } = reducer.actions

export const MainDataReducer = reducer.reducer
