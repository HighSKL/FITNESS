import { useDispatch } from "react-redux"
import Router from "../CustomRouter/router"
import { ErrorResponesType, UserDataType } from "@/app/types"
import { getProfile } from "../api_services/api_service"
import { StatusesCodes } from "../enums"
import { setUserData } from "@/app/(storage)/reducers/userDataReducer"
import React, { useEffect } from "react"

export const userUpdate = () => useUserUpdate()

export async function useUserUpdate() {

    const dispatch = useDispatch()

    const data: UserDataType | ErrorResponesType = await getProfile().then(res => res)
    // debugger
    // if (data.status === StatusesCodes.UserNotAuthorized) {
    //     Router.sendUserTo('/sign')
    //     return null
    // }

    // useEffect(()=>{
        // dispatch(setUserData(data as UserDataType))
    // }, [])

    // return data
    return { data }
}