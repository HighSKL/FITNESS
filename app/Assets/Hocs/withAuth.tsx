'use client'
import React, { useEffect, useState } from 'react';
import { RootState } from '@/app/(storage)/store';
import { useSelector } from 'react-redux';
import UserWorker from '../Hooks/UserWorker';
import Preloader from '@/app/(components)/Preloader/Preloader';

type injectedProps = {}

export default function withAuth<T extends injectedProps>(WrappedComponent: React.ComponentType<T>) {
    return (props: T) => {

        const userData = useSelector((state: RootState) => (state.userData.user))

        const userWorker = new UserWorker();

        const [preloaderActive, setPreloaderActive] = useState(true)

        useEffect(() => {
            (async () => {
                if (!userData) {
                    userWorker.updateUser()
                    .then(()=>setPreloaderActive(false))
                } else
                    setPreloaderActive(false)
            })()
        }, [])

        return (
            <>
                { preloaderActive ? <Preloader /> : <WrappedComponent {...props} /> }
            </>
        )
    }
}