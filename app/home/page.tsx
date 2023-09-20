"use client"
import React from 'react';
import style from './homePage.module.scss'
import { UserDataType } from '../types';
import withAuth from '../Assets/Hocs/withAuth';
import { data } from '../Storage/store';
import { op_san } from '../Assets/fonts';

function HomePage() {

    const user = data.userData

    return (
        <div className={op_san.className}>
            <div className={style.wrapper}>
                <div className={style.content_block}>
                    <h1 className={style.header_text}>Главная</h1>
                    <h4 className={style.wellcome_text}>Здравствуйте, {user?.username}!</h4>
                    <div className={style.journal_block}>
                        <p>Продолжайте вести ваш дневник 🥇</p>
                        <textarea name="" id="" placeholder={'Начните вводить свои заметки или еще что-либо : )'}></textarea>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withAuth(HomePage)