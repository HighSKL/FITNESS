"use client"
import React, {useEffect, useState} from 'react';
import style from './profile.module.scss'
import { getProfile } from '@/app/Assets/api_service';
import { useRouter } from 'next/navigation';
import { UserDataType } from '../types';
import Preloader from '../Assets/Preloader/Preloader';

type PropsType = {
}

export default function Profile(props:PropsType) {

    const router = useRouter();
    const [userData,setUserData] = useState<UserDataType|null>(null)

    useEffect(()=>{
        (async()=>{
            const data:any = await getProfile().then(res=>res)
            if(data?.status === 401)
                router.push('/sign')
            else{
                setUserData(data)
            }
        })()
        
    },[])

    return (
        <> 
            {userData == null?<Preloader />:null}
            <div className={style.wrapper}>
                <h1 className={style.username}>
                    {userData?.username}
                </h1>
            </div>
        </>
    );
}

 