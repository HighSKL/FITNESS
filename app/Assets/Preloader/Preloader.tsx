import React from 'react';
import style from './preloader.module.scss'

export default function Preloader() {
    return (
        <div className={style.wrapper}>
            <div className={style.preloader}></div>
        </div>
    );
}