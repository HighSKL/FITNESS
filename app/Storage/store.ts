import { UserDataType } from "../types";

export const data = {
    userData: null as UserDataType|null
}

export const setUserData = (newUserData: UserDataType) => { data.userData = newUserData }
