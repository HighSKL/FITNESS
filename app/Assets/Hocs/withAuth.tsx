'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { getProfile } from '../api_services/api_service';
import Preloader from '../Preloader/Preloader';
import { RootState } from '@/app/(storage)/store';
import { ErrorResponesType, UserDataType } from '@/app/types';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '@/app/(storage)/reducers/userDataReducer';
import { StatusesCodes } from '../enums';

type injectedProps = {}

export default function withAuth<T extends injectedProps>(WrappedComponent: React.ComponentType<T>) {
    return (props: T) => {

        const router = useRouter();
        const dispatch = useDispatch()

        const userData = useSelector((state: RootState) => (state.userData.user))

        const [isUser, setUser] = useState(false)

        useEffect(() => {
            (async () => {
                if (!userData) {
                    const data: UserDataType | ErrorResponesType = await getProfile().then(res => res)
                    if (data?.status === StatusesCodes.UserNotAuthorized)
                        router.push('/sign')
                    else {
                        dispatch(setUserData(data as UserDataType))
                        setUser(true)
                    }
                } else
                    setUser(true)
            })()
        }, [])

        return (<>
            {isUser ? <WrappedComponent {...props} /> : <Preloader />}
        </>)
    }
}