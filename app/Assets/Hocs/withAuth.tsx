'use client'
import Preloader from '@/app/(components)/Preloader/Preloader';
import useUserUpdate from '../Hooks/useUserUpdate';
import { useEffect } from 'react';
import Router from '../CustomRouter/router';

type injectedProps = {}

export default function withAuth<T extends injectedProps>(WrappedComponent: React.ComponentType<T>) {
    return (props: T) => {

        const router = new Router();

        const { isLoading, isError } = useUserUpdate()

        useEffect(()=>{
            if(isError && !isLoading)
                router.sendUserTo('/sign')
        },[isError, isLoading])

        return (
            <>
                { !isError && !isLoading ? <WrappedComponent {...props} /> : <Preloader />  }
            </>
        )
    }
}