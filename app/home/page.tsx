"use client"
import React, { useState } from 'react';
import style from './homePage.module.scss'
import withAuth from '../Assets/Hocs/withAuth';
import { data } from '../Storage/store';
import { op_san, ubuntu } from '../Assets/fonts';
import Water from '../(trackers)/Water/Water';
import { ModalWidows } from '../Assets/enums';

function HomePage() {

    const user = data.userData
    const trackers = data.trackers

    const [activeModalWindow, setActiveModalWindow] = useState<ModalWidows | null>(null)

    const trackerRender = trackers.map(tracker => (
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
            {activeModalWindow == ModalWidows.WaterWindow ? <Water closeWindow = {setActiveModalWindow} /> : null}
            <div className={op_san.className}>
                <div className={style.wrapper}>
                    <div className={style.content_block}>
                        <h1 className={style.header_text}>Главная</h1>
                        <h4 className={style.wellcome_text}>Здравствуйте, {user?.username}!</h4>
                        <div className={style.journal_block}>
                            <p>Продолжайте вести ваш дневник 🥇</p>
                            <textarea name="" id="" placeholder={'Начните вводить свои заметки или еще что-либо : )'}></textarea>
                        </div>
                        <div className={style.diary_container}>
                            <button className={style.diary_button}>Дневник 📔</button>
                        </div>
                        <div className={style.trackers_block}>
                            <div className={ubuntu.className}>
                                <h1 className={style.block_title}>Трекеры и здоровье</h1>
                                <div className={style.trackers_container}>
                                    {trackerRender}
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