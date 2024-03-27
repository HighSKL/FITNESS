import { useDispatch } from "react-redux"
import Router from "../CustomRouter/router"
import { getProfile } from "../api_services/api_service"
import { ErrorResponesType, UserDataType } from "@/app/types"
import { StatusesCodes } from "../enums"
import { setUserData } from "@/app/(storage)/reducers/userDataReducer"

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

