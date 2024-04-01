"use client"
import { changeActiveNoteDescription, getCurrentNote } from '@/app/( RestApi )/api_services/diary/service';
import Water from '../../(components)/(trackers)/Water/Water';
import Router from '@/app/Assets/CustomRouter/router';
import { op_san, ubuntu } from '../../Assets/fonts';
import { diaryWorker } from '../diary/diaryWorker';
import useInput from '@/app/Assets/Hooks/useInput';
import { RootState } from '../../(storage)/store';
import withAuth from '../../Assets/Hocs/withAuth';
import { Lock, ShowReason } from '../../(components)/Lock/Lock';
import { ModalWidows } from '../../Assets/enums';
import { useEffect, useState } from 'react';
import style from './homePage.module.scss';
import { useSelector } from 'react-redux';
import { NoteType } from '@/app/types';
import { useSearchParams } from 'next/navigation';
import Preloader from '@/app/(components)/Preloader/Preloader';
import BurgerMenu from './(nestedComponents)/burgerMenu/burgerMenu';

function HomePage() {

    const router = new Router()

    const { user, trackers, courses } = useSelector((state: RootState) => ({
        user: state.userData.user,
        trackers: state.mainData.trackers,
        courses: state.mainData.courses
    }))

    const [activeModalWindow, setActiveModalWindow] = useState<ModalWidows | null>(null)
    const [chosenNote, setChosenNote] = useState<NoteType | null>(null)
    const [requestSended, setRequestSended] = useState(false)
    const [reasonShow, setReasonShow] = useState(false)

    const diaryInputText = useInput('')

    const [preloaderActive, setPreloaderActive] = useState(true)


    const preloaderDelay = () => setTimeout(()=>setPreloaderActive(false),300)

    const startReason = () => {
        const reasonParams = useSearchParams().get('reason')
        if (reasonParams) {
            return <ShowReason hideWindow={() => setReasonShow(false)} reason={reasonParams} />
        }
        else return <></>
    }

    const trackersRender = trackers.map(tracker => (
        <div className={style.tracker} key={tracker.trackerID} >

            <Lock onClick={() => setReasonShow(true)} lockWhere={user?.iswellcomebriefingcomplete === false}>
                <div className={style.tracker_content} onClick={() => { setActiveModalWindow(tracker.windowType) }}>
                    <div className={style.tracker_icon}>
                        <p>{tracker.icon}</p>
                    </div>
                    <div className={style.progress_bar} style={{ background: `radial-gradient(closest-side, #34363D 79%, transparent 80% 100%),conic-gradient( ${tracker.trackerColor} 75%, white 0)` }}>
                    </div>
                </div>
            </Lock>
        </div>
    ))

    const coursesRender = courses.available.map(course => (
        <div className={style.course} key={course.id} onClick={() => router.sendUserTo(course.link)} style={{backgroundImage: "url("+course.bgImg+")"}}>
            <h3 className={style['course-title']} style={{background: course.bgColor}}>{course.name}</h3>
        </div>
    ))

    useEffect(() => {
        (async () => {
            
            const { day, month, year } = diaryWorker.getTodayDate()
            if (user) {
                const note = await getCurrentNote(user.id, day, month, year).then(res => res.data)
                if (note.length != 0) {
                    setChosenNote(note[0])
                    diaryInputText.setValue(note[0].description)
                }
            }
            preloaderDelay()
        })()
    }, [])

    const addDiary = async () => {
        const { day, month, year } = diaryWorker.getTodayDate()
        setRequestSended(true)
        if (user) {
            diaryWorker.addNewNote(user.id, day, month, year, diaryInputText.value).then(() => setRequestSended(false))

            const note = await getCurrentNote(user.id, day, month, year).then(res => res.data)
            setChosenNote(note[0])
        }

    }

    const changeNoteDescription = async () => {
        setRequestSended(true)
        chosenNote &&
            await changeActiveNoteDescription(chosenNote.id, diaryInputText.value).then(() => {
                setRequestSended(false)
                setChosenNote(prev => ({ ...prev as NoteType, description: diaryInputText.value }))
            })
    }

    class Conditions {
        public static disabledChangeNoteDesc =
            requestSended || diaryInputText.value == '' || chosenNote?.description == diaryInputText.value
        public static disabledAddNoteDesc = diaryInputText.value == '' || requestSended
    }

    return (
        <>
            {preloaderActive && <Preloader />}
            <>
                {activeModalWindow == ModalWidows.WaterWindow && <Water closeWindow={setActiveModalWindow} />}
                {reasonShow && <ShowReason hideWindow={() => setReasonShow(false)} reason='Пройдите ознакомительный курс' />}
                {startReason()}
                <BurgerMenu />
                <div className={op_san.className}>
                    <div className={style.wrapper}>
                        {/* <LogOut /> */}
                        <div className={style.content_block}>

                            <h1 className={style.header_text}>Главная</h1>
                            <h4 className={style.wellcome_text}>Здравствуйте, {user?.username}!</h4>

                            <div className={style.journal_block}>
                                <p>Продолжайте вести ваш дневник 🥇</p>
                                <div className={style.diary_container}>
                                    <textarea name="" id="" placeholder={'Начните вводить свои заметки или еще что-либо : )'} {...diaryInputText}
                                        style={{ minHeight: diaryInputText.value == '' ? 'auto' : '75px' }} />
                                    <div className={style['buttons-menu']}>
                                        <button className={style.diary_button} onClick={() => router.sendUserTo('diary')}>Дневник 📔</button>
                                        {
                                            chosenNote ?
                                                <button className={style['buttons-menu__btn']} onClick={changeNoteDescription} disabled={Conditions.disabledChangeNoteDesc}>Изменить</button> :
                                                <button className={style['buttons-menu__btn']} onClick={addDiary} disabled={Conditions.disabledAddNoteDesc}>Добавить запись</button>
                                        }
                                    </div>
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

                            <div className={style['courses']}>
                                <h1 className={style.block_title}>Важное и интересное</h1>
                                <div className={style['courses-container']}>
                                    {coursesRender}
                                </div>
                                <button className={style['show-more-btn']}>Показать больше курсов</button>
                            </div>

                        </div>
                    </div>
                </div>
            </>
        </>
    );
}


export default withAuth(HomePage)
// export default HomePage