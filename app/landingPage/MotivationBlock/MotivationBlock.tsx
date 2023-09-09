import React from 'react';
import style from './motivationBlock.module.scss'
import Image from 'next/image';
import motiv_people from '@/public/img/motivpng.png'

export default function MotivationBlock() {
    return (
        <div className={style.wrapper} id='motivation_block'>
            <Image src={motiv_people} alt='' className={style.bg_image} />
            <div className={style.motivation_block}>
                <hr className={style.top_hr}/>
                <p className={style.text}>
                    <span className={style.line_1}>ПОКАЖИ<br/></span>
                    <span className={style.line_2}>НА ЧТО<br/></span>
                    <span className={style.line_3}>ТЫ<br/></span>
                    <span className={style.line_4}>СПОСОБЕН</span>
                </p>
                <hr className={style.bottom_hr}/>
                <button className={style.button}>Присоединиться</button>
                <div className={style.shadow}></div>
            </div>
        </div>
    );
}