'use client'
import React from 'react';
import style from './sign.module.scss'
import { Field, Form, Formik } from 'formik';
import Link from 'next/link';
import { validator } from '../functions';

export default function SignInPage() {

    enum FieldErrors {
        emailError,
        passwordError
    }

    const [fieldError, setFieldError] = React.useState<FieldErrors|null>(null)

    return (
        <div className={style.wrapper}>
            <div className={style.block_container}>
                <div className={style.animation_line}></div>
                <div className={style.auth_form}>
                    <h1 className={style.title}>Авторизация</h1>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        onSubmit={(values) => {
                            if(
                                validator(/^\S+@\S+\.\S+$/,FieldErrors.emailError, values.email, setFieldError)&&
                                validator(/\w/, FieldErrors.passwordError, values.password, setFieldError)
                            ){
                                setFieldError(null);
                                const user = fetch(`http://localhost:3000/api/login?e=${values.email}&p=${values.password}`).then(res => res.json()).then(res=>res)
                                console.log(user)
                            }
                        }}
                    >
                        {() => (
                            <Form className={style.from_container}>
                                <div className={style.email_block}>
                                    <p>Почта</p>
                                    <Field name="email" type="email" className={style.email_field} />
                                    {fieldError == FieldErrors.emailError&&<p className={style.error_text}>Введите действительный email</p>}
                                </div>
                                <div className={style.password_block}>
                                    <p>Пароль</p>
                                    <Field name="password" type="password" className={style.password_field} />
                                    {fieldError==FieldErrors.passwordError&&<p className={style.error_text}>Введите пароль</p>}
                                </div>
                                <button className={style.button}>Войти</button>
                            </Form>
                        )}
                    </Formik>
                    <div className={style.funс_block}>
                        <Link href={"/registration"} className={style.redirect_link}>Регистрация</Link>
                        <Link href={"#"} className={style.redirect_link}>Забыли пароль?</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

