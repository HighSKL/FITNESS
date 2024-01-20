'use client'

import React from 'react';
import { BiLogOut } from "react-icons/bi";
import { logOutUser } from '../api_services/api_service';
import style from './style.module.scss'
import Router from '../CustomRouter/router';

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