'use client'

import React from 'react';
import { BiLogOut } from "react-icons/bi";
import style from './style.module.scss'
import Router from '../../Assets/CustomRouter/router';
import { logOutUser } from '@/app/Assets/api_services/user/service';

 function LogOut() {

    const router = new Router()

    const logOut = async () => {
        const logout = await logOutUser().then(res=>res);
        if(logout.status == 200)
            router.sendUserTo('/sign')
    }

    return (
        <div className={style.logout_button} onClick={() => { logOut() }}>
            <BiLogOut className={style.icon} />
        </div>
    );
}

export default LogOut;