'use client'
import style from './headerBlock.module.scss'
import Link from 'next/link';
import { blinker, op_san } from '@/app/Assets/fonts';
import { useRouter } from 'next/navigation';

export default function HeaderBlock() {

    const router = useRouter()

    return (
        <div className={op_san.className}>
            <div className={style.wrapper}>

                <div className={style.navigation_block}>
                    <div className={style.logo_block}>
                        <div className={blinker.className}>
                            <h1 className={style.logo}>FITNESS</h1>
                        </div>
                    </div>
                    <div className={style.navbar}>
                        <a href={"#advantages_block"} className={style.text}>Преимущества</a>
                        <a href={"#calculator_block"} className={style.text}>Калькулятор</a>
                        <Link href={"/sign"} className={style.text}>Войти</Link>
                    </div>
                </div>

                <div className={style['header-content']}>
                    <div className={style['header-content__left-group']}>
                        <div className={style.header_text}>
                            <p className={style.sticker_text}>🥊 🥇</p>
                            <h1 className={style.motivation_text}>Начните новую<br />спортивную жизнь</h1>
                            <h3 className={style.sub_motivation_text}>А мы вам с этим поможем</h3>
                        </div>
                        <button className={style.button} onClick={()=>{router.push('/sign')}}>Начать</button>
                    </div>
                    <div className={style['header-content__right-group']}>
                    </div>
                </div>
                
                <div className={style.transition_block}></div>
            </div>
        </div>
    );
}