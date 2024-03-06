'use client'
import React from 'react';
import style from '../style.module.scss'
import { compose } from 'redux';
import withAuth from '@/app/Assets/Hocs/withAuth';
import Router from '@/app/Assets/CustomRouter/router';
import useInputLimit from '@/app/Assets/Hooks/useInputLimit';
import { setBrief } from '@/app/Assets/api_services/home/service';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/(storage)/store';

function Wellcome() {

    const router = new Router()
    const weight = useInputLimit(30, 250)
    const height = useInputLimit(100, 250)


    const user_id = useSelector((state: RootState) => state.userData.user?.id)

    const sendRequest = async () => {
        if (user_id) {
            await setBrief(true, user_id)
            router.sendUserTo('/home')
        }
    }

    return (
        <main className={style.wrapper}>
            <button className={style['back-button']} onClick={() => router.sendUserTo('/home')}>{'<< Назад'}</button>
            <h1 className={style.title}>Добро пожаловать&nbsp;!)</h1>

            <br /><br />

            <p>
                Добро пожаловать в&nbsp;наше фитнесс приложение! Мы&nbsp;рады приветствовать вас здесь.
                Мы&nbsp;надеемся что сможем помочь достичь все ваши спортивные цели.
                <br /><br /><b>В процессе работы с&nbsp;приложением вы&nbsp;сможете:</b>
            </p>
            <br />
            <ul>
                <li>Отслеживать показатели потребляемой нормы воды 💧</li>
                <li>Следить за потребляемыми калориями и не допускать отклонения от заданного курса 🥗</li>
                <li>Помечать увилечение или же уменьшение веса ⚖️</li>
                <li>Указывать выполненные тренировки которые смогут помочь следить за вашей активностью 🏃‍♀️</li>
                <li>Заносить информацию о ваших достижениях или же каких-либо других пометках в личный дневник 📕</li>
            </ul>
            <br />
            <br />
            <h2>Трекеры</h2>
            <hr />
            <p>Важной частью в работе с приложением являются <b>трекеры</b></p>
            <br />
            <p>С помощью них вы можете отслеживать показания калорий, потребляемой воды, упражнениях, весе и тд.<br />
                В каждом трекере есть полоска заполнения некоторой цели которую вы можете корректировать под свою цель. Полоски
                в трекере похожи на полоски активности в <a
                    target='_blank'
                    href='https://yablyk.com/350681-what-do-the-activity-rings-in-apple-watch/?ysclid=lsrpa4jd2c448176168'>
                    <b>Apple Fitness</b>
                </a>.
                Заполнение данных полосок поможет держать мотивацию достижения собственных целей.</p>

            <br />
            <p className={style['mark']}><i>* Подробнее ознакомиться каждым из трекеров можно в следующих статьях</i></p>
            <br />
            <br />
            <h2>Данные</h2>
            <hr />
            <br />
            <p>Чтобы начать работу с трекерами вам необходимо ввести некоторые данные о ваших параметрах которые необходимы
                для расчета трекером оптимальных показателей.
            </p>
            <br /><br />
            <div className={style.parameters}>
                <div className={style['container']}>
                    <div className={style.parameter}>
                        <p className={`${style['parameter-title']} ${style['weight']}`}>Вес (кг)</p>
                        <input type="number" {...weight} required className={`${style['parameter-input']} ${style['weight']}`} />
                    </div>
                    <div className={style.parameter}>
                        <p className={style['parameter-title']}>Рост (см)</p>
                        <input type="number" {...height} required className={style['parameter-input']} />
                    </div>
                </div>
                <button type='button' className={style['send-btn']} onClick={sendRequest}>Отправить</button>
            </div>


            <p className={style.quote}><i>"Пять составляющих пути к победе – это стойкость, скорость, сила, мастерство и воля.
                Причем воля – это самое главное!" —— Кен Доэрти
            </i></p>

        </main>
    );
}

export default compose(withAuth)(Wellcome)
// export default Wellcome