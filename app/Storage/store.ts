import { ModalWidows } from "../Assets/enums";
import { UserDataType } from "../types";

// export const data = {
//     userData: null as UserDataType|null,
//     trackers: [
//         {trackerID: 1, trackerColor: "#82DB86", img: "https://svgshare.com/i/xmB.svg", trackerName: "Training Tracker"},
//         {trackerID: 2, trackerColor: "#1380DC", img: "https://svgshare.com/i/xmd.svg", trackerName: "Water Tracker"},
//         {trackerID: 3, trackerColor: "#EF3535", img: "https://svgshare.com/i/xjd.svg", trackerName: "Weight Tracker"},
//         {trackerID: 4, trackerColor: "#FA9D48", img: "https://svgshare.com/i/xmC.svg", trackerName: "Food Tracker"}
//     ]
// }


export const data = {
    userData: null,
    trackers: [
        {trackerID: 1, trackerColor: "#82DB86", icon: "🏃‍♀️", trackerName: "Training Tracker", windowType: ModalWidows.TrainingWindow},
        {trackerID: 2, trackerColor: "#1380DC", icon: "💧", trackerName: "Water Tracker", windowType: ModalWidows.WaterWindow},
        {trackerID: 3, trackerColor: "#EF3535", icon: "⚖️", trackerName: "Weight Tracker", windowType: ModalWidows.WeightWindow},
        {trackerID: 4, trackerColor: "#FA9D48", icon: "🥗", trackerName: "Food Tracker", windowType: ModalWidows.FoodWindow}
    ]
}

export const setUserData = (newUserData: UserDataType) => { data.userData = newUserData }
