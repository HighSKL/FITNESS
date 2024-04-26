"use client"
import Preloader from '../../(components)/Preloader/Preloader';
import useUserUpdate from '../Hooks/useUserUpdate';
import { useEffect } from 'react';
import Router from '../CustomRouter/router';

type injectedProps = {}

export default function withOutOfAuth<T extends injectedProps>(WrappedComponent: React.ComponentType<T>) {
    return (props: T) => {

        const { isLoading, isError: userNotAuth } = useUserUpdate()

        const router = new Router()

        useEffect(()=>{
            if(!userNotAuth && !isLoading)
                router.sendUserTo('/home')
        }, [ userNotAuth, isLoading ])

        return (<>
            { userNotAuth && !isLoading ? <WrappedComponent {...props} /> : <Preloader /> }
        </>)
    }
}