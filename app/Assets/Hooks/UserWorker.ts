import { useDispatch } from "react-redux"
import Router from "../CustomRouter/router"

import { ErrorResponesType, UserDataType } from "@/app/types"
import { StatusesCodes } from "../enums"
import { setUserData } from "@/app/(storage)/reducers/userDataReducer"
import { getProfile } from "../api_services/user/service"

export default class UserWorker {
    private dispatch = useDispatch()
    private router = new Router()

    public async updateUser(){
        const data: any | ErrorResponesType = await getProfile().then(res => res)
        if (data.status === StatusesCodes.UserNotAuthorized) {
            this.router.sendUserTo('/sign')
            return null
        }

        this.dispatch(setUserData(data.data as UserDataType))
    }
}

