import React from 'react';
import style from './categoryBlock.module.scss'
import bg_image from '@/public/img/body.png'
import Image from 'next/image';
import { op_san } from '@/app/Assets/fonts';

export default function CategoryBlock() {
    return (
        <div className={op_san.className}>
            <div className={style.wrapper}>
                <div className={style.top_shadow}></div>
                <Image src={bg_image} alt ='' className={style.bg_image}/>
                <h1 className={style.header_text}>Отслеживайте <span>нужные</span> показатели<br/>в приложении</h1>
                <div className={style.category_container}>
                    <div className={style.category} id={style.category_one}><p className={style.logo}>🏋️</p><p className={style.title}>ТРЕНИРОВКИ</p></div>
                    <div className={style.category} id={style.category_two}><p className={style.logo}>🥗</p><p className={style.title}>ПИТАНИЕ</p></div>
                    <div className={style.category} id={style.category_three}><p className={style.logo}>🏃‍♀️</p><p className={style.title}>АКТИВНОСТЬ</p></div>
                    <div className={style.category} id={style.category_fhour}><p className={style.logo}>📈</p><p className={style.title}>ПРОГРЕСС</p></div>
                </div>
                <div className={style.bottom_shadow}></div>
            </div>
        </div>
    );
}

