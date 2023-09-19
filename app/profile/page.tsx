"use client"
import React from 'react';
import style from './profile.module.scss'
import { UserDataType } from '../types';
import withAuth from '../Assets/Hocs/withAuth';

type PropsType = {
    user: UserDataType
}

function Profile(props: PropsType) {
    return (
        <div className={style.wrapper}>
            <h1 className={style.username}>
                {props.user.username}
            </h1>
        </div>
    );
}

export default withAuth(Profile)