import React from 'react';
import { Field, Form, Formik, FormikValues } from 'formik';
import { StatusesCodes } from '@/app/Assets/enums';
import { authUser } from '@/app/( RestApi )/api_services/user/service';
import { validator } from '../../../functions';
import style from '../sign.module.scss'
import Router from '@/app/Assets/CustomRouter/router';

export default function SignForm() {

    enum FieldErrors {
        emailError,
        passwordError,
        invalidPasswordError,
        userNotFoundError
    }

    const [fieldError, setFieldError] = React.useState<FieldErrors|null>(null)
    const [isSignInDisabled, setIsSignInDisabled] = React.useState(false)
    const router = new Router();

    async function validate(values: FormikValues){
        if(
            validator(/^\S+@\S+\.\S+$/,FieldErrors.emailError, values.email, setFieldError) &&
            validator(/\w/, FieldErrors.passwordError, values.password, setFieldError)
        ){
            setFieldError(null);
            setIsSignInDisabled(true)
            await authUser(values.email, values.password).then((res)=>{
                switch(res.status){
                    case StatusesCodes.OK:{
                        router.sendUserTo('/home')
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
    }

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={async (values) => await validate(values)}
        >
            {() => (
                <Form className={style.from_container}>
                    <div className={style.email_block}>
                        <p>Почта</p>
                        <Field name="email" type="email" className={style.email_field} />
                        {fieldError == FieldErrors.emailError && <p className={style.error_text}>Введите действительный email</p>}
                        {fieldError == FieldErrors.userNotFoundError && <p className={style.error_text}>Пользователь с таким email не найден</p>}
                    </div>
                    <div className={style.password_block}>
                        <p>Пароль</p>
                        <Field name="password" type="password" className={style.password_field} />
                        {fieldError == FieldErrors.passwordError && <p className={style.error_text}>Введите пароль</p>}
                        {fieldError == FieldErrors.invalidPasswordError && <p className={style.error_text}>Неверный пароль</p>}
                    </div>
                    <button className={style.button} disabled={isSignInDisabled}>Войти</button>
                </Form>
            )}
        </Formik>
    );
}