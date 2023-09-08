import React from 'react';
import style from './headerBlock.module.scss'
import { Blinker, Open_Sans } from 'next/font/google'
import Link from 'next/link';
import Image from 'next/image';
import img from '@/public/img/people.png'

const blinker = Blinker({ weight: '700', subsets: ['latin'] })
const op_san = Open_Sans({ subsets: ['latin'] })

export default function HeaderBlock() {
    return (
        <div className={op_san.className}>
            <div className={style.wrapper}>
                <div className={style.navigation_block}>
                    <div className={style.logo_block}>
                        <div className={blinker.className}>
                            <p className={style.logo}>FITNESS</p>
                        </div>
                    </div>
                    <div className={style.navbar}>
                        <Link href={"#"} className={style.text}>Преимущества</Link>
                        <Link href={"#"} className={style.text}>Калькулятор</Link>
                        <Link href={"#"} className={style.text}>Войти</Link>
                    </div>
                </div>
                <div className={style.header_text}>
                    <h1 className={style.sticker_text}>🥊 🥇</h1>
                    <h1 className={style.motivation_text}>Начните новую<br />спортивную жизнь</h1>
                    <h1 className={style.sub_motivation_text}>А мы вам с этим поможем</h1>
                </div>
                <button className={style.button}>Начать</button>
                <div className={style.people_img_container}>
                    <Image src={img} alt=''/>
                </div>
                <div className={style.transition_block}></div>
            </div>
        </div>

    );
}