'use client'
import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import style from './calculatorBlock.module.scss'
import { op_san } from '@/app/Assets/fonts';

export default function CalculatorBlock() {

    enum Activitys {
        NO_LOAD = 1.2,
        AVERAGE_SEVERITY_3_PER_WEEK = 1.38,
        AVERAGE_SEVERITY_5_PER_WEEK = 1.46,
        TRAINING_5_PER_WEEK = 1.55,
        EVERY_DAY_TRAINING = 1.64,
        TRAINING_EVERY_DAY_OR_2_PER_WEEK = 1.73,
        EVERY_DAY_LOAD = 1.9
    }

    enum Sex {
        male,
        female
    }

    enum FieldError {
        HeightField,
        WeightField,
        AgeField,
        SexField
    }

    const activitys = [
        { activityType: Activitys.NO_LOAD, description: 'Физическая нагрузка отсутствует или минимальная' },
        { activityType: Activitys.AVERAGE_SEVERITY_3_PER_WEEK, description: 'Тренировки средней тяжести 3 раза в неделю' },
        { activityType: Activitys.AVERAGE_SEVERITY_5_PER_WEEK, description: 'Тренировки средней тяжести 5 раз в неделю' },
        { activityType: Activitys.TRAINING_5_PER_WEEK, description: 'Интенсивные тренировки 5 раз в неделю' },
        { activityType: Activitys.EVERY_DAY_TRAINING, description: 'Тренировки каждый день' },
        { activityType: Activitys.TRAINING_EVERY_DAY_OR_2_PER_WEEK, description: 'Интенсивные тренировки каждый день или по 2 раза в день' },
        { activityType: Activitys.EVERY_DAY_LOAD, description: 'Ежедневная физическая нагрузка + физическая работа' }
    ]

    const [activity, setActivity] = useState(Activitys.NO_LOAD);
    const [userSex, setUserSex] = useState<Sex | null>(null);
    const [DCI, setDCI] = useState(0);
    const [fieldErrors, setFieldErrors] = useState<FieldError | null>(null)
    const fieldValidate = (regExp: RegExp, error: FieldError, value: string) => (regExp.test(value)) ? true : setFieldErrors(error)
    const sexFieldValudate = () => (userSex !== null) ? true : setFieldErrors(FieldError.SexField)

    const activitysRender = activitys.map((thisActivity) => (
        <div className={style.activity_block} id={activity == thisActivity.activityType ? style.active : ''} onClick={() => { setActivity(thisActivity.activityType) }}>
            <p className={style.activity_description}>{thisActivity.description}</p>
            {activity == thisActivity.activityType ? <div className={style.active_dot}></div> : null}
        </div>
    ))



    return (
        <div className={op_san.className} >
            <div className={style.wrapper} id='calculator_block'>
                <div className={style.data_container}>
                    <h1 className={style.title}><span>ВАШ</span> КАЛЬКУЛЯТОР КАЛОРИЙ</h1>
                    <div className={style['content-container']}>
                        <div className={style.activity_container}>
                            {activitysRender}
                            <div className={style.result_block}>
                                <p className={style.result_text}>Рекомендуемая дневная норма калорий ~ <span>{DCI}</span></p>
                                <p className={style.subtitle}>*более подробные данные можно получить в<br />нашем приложении</p>
                            </div>
                        </div>
                        <Formik
                            initialValues={{ userWeight: '', userHeight: '', userAge: '', userSex: '' }}
                            onSubmit={(values) => {
                                if (
                                    sexFieldValudate() &&
                                    fieldValidate(/^\d+$/, FieldError.HeightField, values.userHeight) &&
                                    fieldValidate(/^\d+$/, FieldError.WeightField, values.userWeight) &&
                                    fieldValidate(/^\d+$/, FieldError.AgeField, values.userAge)
                                ) {
                                    setFieldErrors(null)
                                    setDCI(Math.floor(((parseInt(values.userWeight) * 10) + (parseInt(values.userHeight) * 6.25) - (parseInt(values.userAge) * 5) + (userSex == Sex.male ? 5 : -161)) * activity))
                                }
                            }}
                        >
                            {() => (
                                <Form className={style.form_block}>
                                    <h3>Укажите ваш пол</h3>
                                    <div className={style.checkbox_container}>
                                        <div className={style.male_checkbox_block}>
                                            <input type="checkbox" name="" checked={userSex == Sex.male ? true : false} id="" onClick={() => { setUserSex(Sex.male) }} />
                                            <p>мужской</p>
                                        </div>
                                        <div className={style.female_checkbox_block}>
                                            <input type="checkbox" name="" checked={userSex == Sex.female ? true : false} id="" onClick={() => { setUserSex(Sex.female) }} />
                                            <p>женский</p>
                                        </div>
                                        {fieldErrors == FieldError.SexField ? <p className={style.error_text}>Выберите свой пол</p> : null}
                                    </div>
                                    <div className={style.fields_container}>
                                        <Field type="textarea" name="userHeight" className={style.form} placeholder="Введите ваш рост (см)" />
                                        {fieldErrors == FieldError.HeightField ? <p className={style.error_text}>Укажите ваш рост в числовом диапозоне</p> : null}
                                        <Field type="textarea" name="userWeight" className={style.form} placeholder="Введите ваш вес (кг)" />
                                        {fieldErrors == FieldError.WeightField ? <p className={style.error_text}>Укажите ваш вес в числовом диапозоне</p> : null}
                                        <Field type="textarea" name="userAge" className={style.form} placeholder="Введите ваш возраст" />
                                        {fieldErrors == FieldError.AgeField ? <p className={style.error_text}>Укажите ваш возраст в числовом диапозоне</p> : null}
                                    </div>

                                    <button type='submit' className={style.button}>Рассчитать</button>

                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>

    );
}