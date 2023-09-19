'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { getProfile } from '../api_service';
import Preloader from '../Preloader/Preloader';
import { data, setUserData } from '@/app/Storage/store';
import { ErrorResponesType, UserDataType } from '@/app/types';

type injectedProps = {}

export default function withAuth<T extends injectedProps>(WrappedComponent: React.ComponentType<T>) {
    return (props: T) => {

        const router = useRouter();

        const user = data.userData

        const [isUser, setUser] = useState(false)

        useEffect(() => {
            if (!user) {
                (async () => {
                    const data: UserDataType|ErrorResponesType = await getProfile().then(res => res)
                    if (data?.status === 401)
                        router.push('/sign')
                    else {
                        setUserData(data as UserDataType)
                        setUser(true)
                    }
                })()
            }
            else
                setUser(true) 

        }, [])

        return (<>
            {isUser?<WrappedComponent user = {user} {...props}/>:<Preloader />}
        </>)
    }
}