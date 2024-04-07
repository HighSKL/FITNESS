'use client'
import { RootState } from '@/app/(storage)/store';
import { useSelector } from 'react-redux';
import Preloader from '@/app/(components)/Preloader/Preloader';
import useUserUpdate from '../Hooks/useUserUpdate';

type injectedProps = {}

export default function withAuth<T extends injectedProps>(WrappedComponent: React.ComponentType<T>) {
    return (props: T) => {

        const userData = useSelector((state: RootState) => (state.userData.user))

        const { isLoading } = useUserUpdate()

        return (
            <>
                { !userData || isLoading ? <Preloader /> : <WrappedComponent {...props} /> }
            </>
        )
    }
}