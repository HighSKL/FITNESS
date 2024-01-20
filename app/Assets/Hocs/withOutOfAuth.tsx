"use client"
import { data, setUserData } from '@/app/(storage)/store';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Preloader from '../Preloader/Preloader';
import { getProfile } from '../api_services/api_service';
import { ErrorResponesType, UserDataType } from '@/app/types';

type injectedProps = {}

export default function withOutOfAuth<T extends injectedProps>(WrappedComponent: React.ComponentType<T>) {
    return (props: T) => {

        const user = data.userData
        const router = useRouter()

        const [isUser, setUser] = useState(true)

        useEffect(() => {
            console.log(user)
            if (!user) {
                (async () => {
                    const data: UserDataType|ErrorResponesType  = await getProfile().then(res => res)
                    console.log(data)
                    if (data?.status === 401) {
                        setUser(false)
                    }
                    else {
                        setUserData(data as UserDataType)
                        setUser(true)
                        router.push('/home')
                    }
                })()
            }
            else{
                setUser(true)
                router.push('/home')
            }
        }, [])

        return (<>
            {isUser ? <Preloader /> : <WrappedComponent {...props} />}
        </>)
    }
}