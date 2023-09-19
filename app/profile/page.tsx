"use client"
import React from 'react';
import style from './profile.module.scss'
import { UserDataType } from '../types';
import withAuth from '../Assets/Hocs/withAuth';
import { data } from '../Storage/store';


function Profile() {

    const user = data.userData

    return (
        <div className={style.wrapper}>
            <h1 className={style.username}>
                {user?.username}
            </h1>
        </div>
    );
}

export default withAuth(Profile)