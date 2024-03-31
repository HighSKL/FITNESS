import React, { useEffect, useState } from 'react';
import Router from '../CustomRouter/router';
import { getBrief } from '../../( RestApi )/api_services/home/service';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/(storage)/store';
import Preloader from '../../(components)/Preloader/Preloader';

type injectedProps = {}

export default function withNoBriefComplete<T extends injectedProps>(WrappedComponent: React.ComponentType<T>) {
    return (props: T) => {

        const router = new Router
        const userId = useSelector((state: RootState) => state.userData.user?.id)
        const [preloaderActive, setPreloaderActive] = useState(true)

        useEffect(() => {
            (async () => {
                if (userId) {
                    const isBriefComplete = await getBrief(userId).then((res) => res.data.iswellcomebriefingcomplete);
                    if (isBriefComplete == true) {
                        router.sendUserTo('/home?reason=Ознакомительный курс уже пройден')
                    }
                    else {
                        setPreloaderActive(false)
                    }
                }

            })()
        })

        return (
            <>
                {preloaderActive && <Preloader />}
                <WrappedComponent {...props} />:
            </>
        )
    }
}
