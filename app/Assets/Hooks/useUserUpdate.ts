import { userAPI } from "@/app/( RestApi )/api_services/customServices"
import { setUserData } from "@/app/(storage)/reducers/userDataReducer"
import { UserDataType } from "@/app/types"
import { useDispatch } from "react-redux"
import Router from "../CustomRouter/router"
import { useEffect } from "react"

export default function useUserUpdate(){

    const { data, isLoading, isError } = userAPI.useGetProfileQuery('')
    const dispatch = useDispatch()
    const router = new Router()

    useEffect(()=>{
        updateUser()
    }, [data])
    
    const updateUser = () => {
        if( data )
            dispatch(setUserData(data.data as UserDataType))
        else 
            router.sendUserTo('/sign')
    }

    return {
        isLoading, isError,
        updateUser, data
    }
}