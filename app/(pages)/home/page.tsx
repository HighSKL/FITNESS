"use client"
import React, { useState } from 'react';
import style from './homePage.module.scss'
import withAuth from '../../Assets/Hocs/withAuth';
import { RootState, data } from '../../(storage)/store';
import { op_san, ubuntu } from '../../Assets/fonts';
import Water from '../../(components)/(trackers)/Water/Water';
import { ModalWidows } from '../../Assets/enums';

import Lock from '../../Assets/LockTracker/Lock';
import { useDispatch, useSelector } from 'react-redux';
import LogOut from '@/app/Assets/LogOut/LogOut';
import Router from '@/app/Assets/CustomRouter/router';

function HomePage() {


    const router = new Router()
    const user = data.userData
    const trackers = useSelector((state: RootState)=>state.mainData.trackers)

    const [activeModalWindow, setActiveModalWindow] = useState<ModalWidows | null>(null)

    const trackersRender = trackers.map(tracker => (
        <div className={style.tracker} key={tracker.trackerID} onClick={() => { setActiveModalWindow(tracker.windowType) }}>
            <div className={style.tracker_content}>
                <div className={style.tracker_icon}>
                    <p>{tracker.icon}</p>
                </div>
                <div className={style.progress_bar} style={{ background: `radial-gradient(closest-side, #34363D 79%, transparent 80% 100%),conic-gradient( ${tracker.trackerColor} 75%, white 0)` }}>
                </div>
            </div>
        </div>
    ))

    return (
        <>
            {activeModalWindow == ModalWidows.WaterWindow && <Water closeWindow = {setActiveModalWindow} />}
            <div className={op_san.className}>
                <div className={style.wrapper}>
                    <LogOut />
                    <div className={style.content_block}>
                        <h1 className={style.header_text}>Главная</h1>
                        <h4 className={style.wellcome_text}>Здравствуйте, {user?.username}!</h4>
                        <div className={style.journal_block}>
                            <p>Продолжайте вести ваш дневник 🥇</p>
                            <div className={style.diary_container}>
                                <textarea name="" id="" placeholder={'Начните вводить свои заметки или еще что-либо : )'}></textarea>
                                <button className={style.diary_button} onClick={()=>router.sendUserTo('diary')}>Дневник 📔</button>
                            </div>
                        </div>
                        
                        <div className={style.trackers_block}>
                            <div className={ubuntu.className}>
                                <h1 className={style.block_title}>Трекеры и здоровье</h1>
                                <div className={style.trackers_container}>
                                    {trackersRender}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default withAuth(HomePage)