'use client'
import React from 'react';
import style from './registrationPage.module.scss';
import withOutOfAuth from '@/app/Assets/Hocs/withOutOfAuth';
import RegForm from './nestedComponents/RegForm';

const RegistrationPage = () => (
    <div className={style.wrapper}>
        <div className={style.registration_block}>
            <h1 className={style.title}>Регистрация</h1>
            <RegForm />
        </div>
    </div>
)

export default withOutOfAuth(RegistrationPage)