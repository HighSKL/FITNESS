'use client'

import React, { useEffect, useState } from 'react';
import style from './style.module.scss'
import { FaPersonRunning } from "react-icons/fa6";
import { IoWater } from "react-icons/io5";
import { GiWeight } from "react-icons/gi";
import { ImSpoonKnife } from "react-icons/im";
import { IoMdSettings, IoIosMenu, IoMdClose } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
import { logOutUser } from '@/app/( RestApi )/api_services/user/service';
import Router from '@/app/Assets/CustomRouter/router';
import { setUserData } from '@/app/(storage)/reducers/userDataReducer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/(storage)/store';
import Link from 'next/link';


export default function BurgerMenu() {

    const router = new Router()
    const dispatch = useDispatch();

    const [mobileVersion, setMobileVersion] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isBriefingComplete = useSelector((state: RootState) => (state.userData.user?.iswellcomebriefingcomplete))

    const logOut = async () => {
        const logout = await logOutUser().then(res => res);
        router.sendUserTo('/sign')
        if (logout.status == 200) {
            dispatch(setUserData(null))
            // router.sendUserTo('/sign')
        }
    }

    // mobile version listener
    useEffect(() => {
        handleResize()

        function handleResize() {
            if (window.innerWidth <= 767)
                setMobileVersion(true)
            else
                setMobileVersion(false)
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


    return (
        <>
            {
                mobileVersion ?
                    <div className={style['mobile-wrapper']}>
                        <button className={`${style["mobile-btn"]} ${style["tool-btn"]}`} onClick={() => setIsMenuOpen(true)}><IoIosMenu /></button>
                        <div className={style.panel} style={{marginLeft: isMenuOpen?"0":"-100%"}}>
                            <button className={`${style["close-panel-btn"]} ${style["tool-btn"]}`} onClick={()=> setIsMenuOpen(false)}><IoMdClose /></button>
                            {
                                isBriefingComplete &&
                                <div className={style["mobile-menu-items"]} style={{ marginLeft: isMenuOpen ? "0" : "-100vh" }}>
                                    <button><Link href={'/active'}><FaPersonRunning /> <span>Тренировки</span></Link></button>
                                    <button><Link href={'/water'}><IoWater /> <span>Вода</span></Link></button>
                                    <button><Link href={'/mass'}><GiWeight /> <span>Вес</span></Link></button>
                                    <button><Link href={'/food'}><ImSpoonKnife /> <span>Еда</span></Link></button>
                                    <button><Link href={'/settings'}><IoMdSettings /> <span>Настройки</span></Link></button>
                                </div>
                            }
                            <button onClick={logOut} className={style["logout-btn"]}><BiLogOut /> <span>Выход</span></button>
                        </div>
                    </div>

                    :

                    <div className={style.wrapper}>

                        <div className={style["items-container"]}>
                            <h1 className={style.logotype}>F</h1>
                            {
                                isBriefingComplete &&
                                <div className={style.tools}>
                                    <button><Link href={'/active'}><FaPersonRunning /></Link></button>
                                    <button><Link href={'/water'}><IoWater /></Link></button>
                                    <button><Link href={'/mass'}><GiWeight /></Link></button>
                                    <button><Link href={'/food'}><ImSpoonKnife /></Link></button>
                                    <button><Link href={'/settings'}><IoMdSettings /></Link></button>
                                </div>
                            }

                            <button onClick={logOut}><BiLogOut /></button>
                        </div>
                    </div>
            }

        </>

    );
}