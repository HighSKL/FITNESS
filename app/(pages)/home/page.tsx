"use client"
import Water from '../../(components)/(trackers)/Water/Water';
import { op_san } from '../../Assets/fonts';
import { RootState } from '../../(storage)/store';
import withAuth from '../../Assets/Hocs/withAuth';
import { ShowReason } from '../../(components)/Lock/Lock';
import { ModalWidows } from '../../Assets/enums';
import { useEffect, useState } from 'react';
import style from './homePage.module.scss';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import Preloader from '@/app/(components)/Preloader/Preloader';
import BurgerMenu from './(nestedComponents)/burgerMenu/burgerMenu';
import TrackersBlock from './(nestedComponents)/TrackersBlock/TrackersBlock';
import CoursesBlock from './(nestedComponents)/CoursesBlock/CoursesBlock';
import DiaryBlock from './(nestedComponents)/DiaryBlock/DiaryBlock';
import Training from '@/app/(components)/(trackers)/Training/Training';
import Weight from '@/app/(components)/(trackers)/Weight/Weight';
import Food from '@/app/(components)/(trackers)/Food/Food';

function HomePage() {

    const user = useSelector((state: RootState) => state.userData.user)

    const [activeModalWindow, setActiveModalWindow] = useState<ModalWidows | null>(null)

    const [reasonShow, setReasonShow] = useState(false)

    const [preloaderActive, setPreloaderActive] = useState(true)

    const preloaderDelay = () => setTimeout(() => setPreloaderActive(false), 300)

    const startReason = () => {
        const reasonParams = useSearchParams().get('reason')
        if (reasonParams) {
            return <ShowReason hideWindow={() => setReasonShow(false)} reason={reasonParams} />
        }
        else return <></>
    }

    const modalWindows = {
        'null': <></>,
        'water-window': <Water closeWindow={setActiveModalWindow}/>,
        'training-window': <Training closeWindow={setActiveModalWindow}/>,
        'weight-window': <Weight closeWindow={setActiveModalWindow}/>,
        'food-window': <Food closeWindow={setActiveModalWindow}/>
    }

    useEffect(() => { preloaderDelay() }, [])

    return (
        <>
            {preloaderActive && <Preloader />}
            {modalWindows[`${activeModalWindow}`]}
            {reasonShow && <ShowReason hideWindow={() => setReasonShow(false)} reason='Пройдите ознакомительный курс' />}
            {startReason()}
            <BurgerMenu />
            <div className={op_san.className}>
                <div className={style.wrapper}>
                    <div className={style.content_block}>

                        <h1 className={style.header_text}>Главная</h1>
                        <h4 className={style.wellcome_text}>Здравствуйте, {user?.username}!</h4>

                        <DiaryBlock />

                        {!preloaderActive && <TrackersBlock
                            briefCompleted={user?.iswellcomebriefingcomplete}
                            setActiveModalWindow={setActiveModalWindow}
                            setReasonShow={setReasonShow}
                        />}

                        <CoursesBlock />

                    </div>
                </div>
            </div>
        </>
    );
}

export default withAuth(HomePage)
// export default HomePage