'use client'
import React from 'react';
import style from './sign.module.scss'
import Link from 'next/link';
import withOutOfAuth from '@/app/Assets/Hocs/withOutOfAuth';
import SignForm from './nestedComponents/SignForm';

const SignInPage = () => (
    <div className={style.wrapper}>
        <div className={style.block_container}>
            <div className={style.animation_line}></div>
            <div className={style.auth_form}>
                <h1 className={style.title}>Авторизация</h1>
                <SignForm />
                <div className={style.funс_block}>
                    <Link href={"/registration"} className={style.redirect_link}>Регистрация</Link>
                    <Link href={"#"} className={style.redirect_link}>Забыли пароль?</Link>
                </div>
            </div>
        </div>
    </div>
);

export default withOutOfAuth(SignInPage)