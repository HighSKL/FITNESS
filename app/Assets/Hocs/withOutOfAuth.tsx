"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Preloader from '../../(components)/Preloader/Preloader';
import { getProfile } from '../api_services/api_service';
import { ErrorResponesType, UserDataType } from '@/app/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/(storage)/store';
import { setUserData } from '@/app/(storage)/reducers/userDataReducer';
import { StatusesCodes } from '../enums';

type injectedProps = {}

export default function withOutOfAuth<T extends injectedProps>(WrappedComponent: React.ComponentType<T>) {
    return (props: T) => {

        const dispatch = useDispatch()

        const user = useSelector((state: RootState) => (state.userData.user))
        const router = useRouter()

        const [isUser, setUser] = useState(true)

        useEffect(() => {
            (async () => {
                if (!user) {
                    const data: UserDataType | ErrorResponesType = await getProfile().then(res => res)
                    if (data?.status === StatusesCodes.UserNotAuthorized)
                        setUser(false)
                    else {
                        dispatch(setUserData(data as UserDataType))
                        setUser(true)
                        router.push('/home')
                    }
                } else {
                    setUser(true)
                    router.push('/home')
                }
            })()
        }, [])

        return (<>
            {isUser ? <Preloader /> : <WrappedComponent {...props} />}
        </>)
    }
}