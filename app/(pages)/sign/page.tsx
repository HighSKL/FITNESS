'use client'
import React from 'react';
import style from './sign.module.scss'
import { Field, Form, Formik } from 'formik';
import Link from 'next/link';
import { validator } from '../../functions';
import { authUser } from '../../Assets/api_services/api_service';
import { useRouter } from 'next/navigation';
import withOutOfAuth from '@/app/Assets/Hocs/withOutOfAuth';
import { StatusesCodes } from '@/app/Assets/enums';

function SignInPage() {

    enum FieldErrors {
        emailError,
        passwordError,
        invalidPasswordError,
        userNotFoundError
    }

    const [fieldError, setFieldError] = React.useState<FieldErrors|null>(null)
    const [isSignInDisabled, setIsSignInDisabled] = React.useState(false)
    const router = useRouter()

    return (
        <div className={style.wrapper}>
            <div className={style.block_container}>
                <div className={style.animation_line}></div>
                <div className={style.auth_form}>
                    <h1 className={style.title}>Авторизация</h1>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        onSubmit={async (values) => {
                            if(
                                validator(/^\S+@\S+\.\S+$/,FieldErrors.emailError, values.email, setFieldError)&&
                                validator(/\w/, FieldErrors.passwordError, values.password, setFieldError)
                            ){
                                setFieldError(null);
                                setIsSignInDisabled(true)
                                await authUser(values.email, values.password).then((res)=>{
                                    switch(res.status){
                                        case StatusesCodes.OK:{
                                            router.push('/home')
                                            break
                                        }
                                        case StatusesCodes.UserNotFound:{
                                            setFieldError(FieldErrors.userNotFoundError)
                                            break
                                        }
                                        case StatusesCodes.InvalidPassword:{
                                            setFieldError(FieldErrors.invalidPasswordError)
                                            break
                                        }
                                    }
                                    setIsSignInDisabled(false)
                                })

                            }
                        }}
                    >
                        {() => (
                            <Form className={style.from_container}>
                                <div className={style.email_block}>
                                    <p>Почта</p>
                                    <Field name="email" type="email" className={style.email_field} />
                                    {fieldError == FieldErrors.emailError&&<p className={style.error_text}>Введите действительный email</p>}
                                    {fieldError == FieldErrors.userNotFoundError&&<p className={style.error_text}>Пользователь с таким email не найден</p>}
                                </div>
                                <div className={style.password_block}>
                                    <p>Пароль</p>
                                    <Field name="password" type="password" className={style.password_field} />
                                    {fieldError==FieldErrors.passwordError&&<p className={style.error_text}>Введите пароль</p>}
                                    {fieldError==FieldErrors.invalidPasswordError&&<p className={style.error_text}>Неверный пароль</p>}
                                </div>
                                <button className={style.button} disabled={isSignInDisabled}>Войти</button>
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

export default withOutOfAuth(SignInPage)
