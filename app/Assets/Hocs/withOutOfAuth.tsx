"use client"
import Preloader from '../../(components)/Preloader/Preloader';
import useUserUpdate from '../Hooks/useUserUpdate';
import { useEffect } from 'react';
import Router from '../CustomRouter/router';

type injectedProps = {}

export default function withOutOfAuth<T extends injectedProps>(WrappedComponent: React.ComponentType<T>) {
    return (props: T) => {

        const { isLoading, data: userData } = useUserUpdate()

        const router = new Router()

        useEffect(()=>{
            if(userData){
                router.sendUserTo('/home')
            }
        }, [userData])

        return (<>
            { isLoading ? <Preloader /> : <WrappedComponent {...props} /> }
        </>)
    }
}