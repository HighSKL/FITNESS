import { userAPI } from "@/app/( RestApi )/api_services/customServices"
import { setUserData } from "@/app/(storage)/reducers/userDataReducer"
import { UserDataType } from "@/app/types"
import { useDispatch } from "react-redux"
import { useEffect } from "react"

export default function useUserUpdate(){

    const { data, isLoading, isError } = userAPI.useGetProfileQuery('')
    const dispatch = useDispatch()

    useEffect(()=>{
        updateUser()
    }, [data])
    
    const updateUser = () => {
        if(isLoading == false){
            if( data )
                dispatch(setUserData(data.data as UserDataType))
            else 
                return("User not authorized")
        }
    }

    return {
        isLoading, isError,
        updateUser, data
    }
}