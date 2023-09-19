'use client'
import React from 'react';
import style from './registrationPage.module.scss';
import { Field, Form, Formik } from 'formik';
import { validator } from '../../functions';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useRouter } from 'next/navigation';
import { createUser } from '../../Assets/api_service';
import withOutOfAuth from '@/app/Assets/Hocs/withOutOfAuth';

function RegistrationPage() {

    const router = useRouter();

    enum FieldErrors {
        userNameError,
        emailError,
        passwordError
    }

    const [fieldError, setFieldError] = React.useState<FieldErrors|null>(null)
    const [passwordVisible, setPasswordVisible] = React.useState(false)
    const [isSignInDisabled, setIsSignInDisabled] = React.useState(false)

    return (
        <div className={style.wrapper}>
            <div className={style.registration_block}>
                <h1 className={style.title}>Регистрация</h1>
                <Formik
                        initialValues={{ email: '', password: '', userName: ''}}
                        onSubmit={ async (values) => {
                            if(
                                validator(/^[a-zA-Zа-яёА-ЯЁ\s]{2,20}$/, FieldErrors.userNameError, values.userName, setFieldError)&&
                                validator(/^\S+@\S+\.\S+$/,FieldErrors.emailError, values.email, setFieldError)&&
                                validator(/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(.*[A-Z]{1,}).*$/, FieldErrors.passwordError, values.password, setFieldError)
                            ){
                                setFieldError(null)
                                setIsSignInDisabled(true)
                                await createUser(values.userName, values.email, values.password).then(res=>{
                                    router.push('/profile')
                                    setIsSignInDisabled(false)
                                })
                            }
                        }}
                    >
                        {() => (
                            <Form className={style.from_container}>
                                <div className={style.user_name_block}>
                                    <p>Ваш никнейм</p>
                                    <Field name="userName" type="text" className={style.user_name_field} />
                                    {fieldError == FieldErrors.userNameError&&<p className={style.error_text}>Укажите ваш никнейм (&lt;20 символов)</p>}
                                </div>
                                <div className={style.email_block}>
                                    <p>Укажите вашу почту</p>
                                    <Field name="email" type="email" className={style.email_field} />
                                    {fieldError == FieldErrors.emailError&&<p className={style.error_text}>Введите действительный email</p>}
                                </div>
                                <div className={style.password_block}>
                                    <p>Придумайте пароль</p>
                                    <Field name="password" type={passwordVisible?"text":"password"} className={style.password_field} />
                                    {passwordVisible?<AiOutlineEyeInvisible className={style.eye_icon} onClick={()=>setPasswordVisible(false)}/>:<AiOutlineEye className={style.eye_icon} onClick={()=>setPasswordVisible(true)}/>}
                                </div>
                                <p className={fieldError==FieldErrors.passwordError?style.error_password_text:style.password_text}>
                                    * Пароль должен содержать:<br/>
                                    - 8 и более символов<br/>
                                    - Хотя бы одну заглавную букву<br/>
                                    - Хотя бы одну цифру
                                </p>
                                <button type="submit" className={style.button} disabled={isSignInDisabled}>Создать аккаунт</button>
                                
                            </Form>
                        )}
                    </Formik>
            </div>
        </div>
    );
}

export default withOutOfAuth(RegistrationPage)