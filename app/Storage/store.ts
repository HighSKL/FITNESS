import { UserDataType } from "../types";

// export const data = {
//     userData: null as UserDataType|null
// }


export const data = {
    userData: {email: "a@a.a", height: null, id: 17, iswellcomebriefingcomplete: false, userimg: null, username: "Алексей", weight: null} as any|null
}

export const setUserData = (newUserData: UserDataType) => { data.userData = newUserData }
