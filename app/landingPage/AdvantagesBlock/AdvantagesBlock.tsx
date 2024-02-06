import React from 'react';
import style from './advantagesBlock.module.scss'
import Image from 'next/image';
import block_1_img from '@/public/img/phone_in_hand.png'
import block_2_img from '@/public/img/food.png'
import block_3_img from '@/public/img/dumbbel.png'
import {inter} from '@/app/Assets/fonts'



export default function AdvantagesBlock() {
    return (
        <div className={inter.className}>
            <div className={style.wrapper}  >
                <div className={style.title_text_container} id='advantages_block'>
                    <h1 >НАШИ ПРЕИМУЩЕСТВА&nbsp;💪</h1>
                    <p>ИЛИ ВСЕ ЧТО МОЖЕТ БЫТЬ ПОЛЕЗНЫМ&nbsp;⭐</p>
                </div>
                <div className={style.advantages_container}>
                    <div className={style.block_1}>
                        <Image src={block_1_img} alt='' className={style.image}/>
                        <div className={style.shadow}></div>
                        <p>Удобный интерфейс</p>
                    </div>
                    <div className={style.block_2}>
                        <Image src={block_2_img} alt='' className={style.image}/>
                        <div className={style.shadow}></div>
                        <p>Множество рецептов</p>
                    </div>
                    <div className={style.block_3}>
                    <Image src={block_3_img} alt='' className={style.image}/>
                        <div className={style.shadow}></div>
                        <p>Большая <span>база</span> тренировок</p>
                    </div>
                </div>
            </div>
        </div>
    );
}