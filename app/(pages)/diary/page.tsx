'use client'
import withAuth from '@/app/Assets/Hocs/withAuth';
import { useEffect, useState } from 'react';
import style from './style.module.scss'
import { DaysWeek, DaysWeekMobile, Months } from '@/app/Assets/enums';
import { FaRegUser } from "react-icons/fa";
import Router from '@/app/Assets/CustomRouter/router';
import DiaryDataWindow from '@/app/(components)/DiaryDataWindow/DiaryDataWindow'
import { useSelector } from 'react-redux';
import { RootState } from '@/app/(storage)/store';
import { getNotes } from '@/app/Assets/api_services/diary/service';
import { NoteType } from '@/app/types';
import { diaryWorker } from './diaryWorker';

function Diary() {

    const [activeYear, setActiveYear] = useState(new Date().getFullYear())
    const [activeMonth, setActiveMonth] = useState((new Date().getMonth()))
    const [notes, setNotes] = useState<NoteType[]>([])

    const user = useSelector((state:RootState)=>state.userData.user)

    const redirect = new Router()

    const [dialogWindowOpen, setDialogWindowOpen] = useState<{ day: number } | null>(null)

    class CalendarToolWorker {
        static ChooseNextMonth = () => {
            if (activeMonth == 11) {
                setActiveYear(prev => prev + 1)
                setActiveMonth(0)
            } else {
                setActiveMonth(prev => prev + 1)
            }
            setDialogWindowOpen(null)
        }
        static ChooseNextYear = () => {
            setActiveYear(prev => prev + 1)
        }
        static ChoosePrevYear = () => {
            setActiveYear(prev => prev - 1)
        }
        static ChoosePrevMonth = () => {
            if (activeMonth == 0) {
                setActiveYear(prev => prev - 1)
                setActiveMonth(11)
            }
            else {
                setActiveMonth(prev => prev - 1)
            }
            setDialogWindowOpen(null)
        }
    }

    const setDialogWindowOpenFunc = (day: number) => {
        const dto = {
            day: day
        }
        setDialogWindowOpen(dto)
    }

    useEffect(()=>{
        (async () => {
            if(user)
                setNotes(await diaryWorker.getNotes(user.id, activeMonth+1, activeYear))
        })()
    }, [activeMonth, activeYear, [] ])

    const renderCalendar = () => {

        let DayWeek = 0;
        const daysWeek = [1, 2, 3, 4, 5, 6, 0];

        const DaysInMonth = new Date(activeYear, activeMonth + 1, 0).getDate();

        const daysArr = Array.from(Array(DaysInMonth + 1).keys()).slice(1);

        if ((activeMonth + 1) > 9)
            DayWeek = new Date(`${activeYear}-${activeMonth + 1}-01`).getDay();
        else
            DayWeek = new Date(`${activeYear}-0${activeMonth + 1}-01`).getDay();

        if (DayWeek == 0)
            for (let i = 0; i < 6; i++)
                daysArr.unshift(0);
        else
            for (let i = 0; i < DayWeek - 1; i++)
                daysArr.unshift(0);
                
        return (
            <div className={style.cells}>
                <div className={style['weeks-day-container']}>
                    {daysWeek.map(day => (
                        <div className={style['weeks-day-text-desc']}>{DaysWeek[day]}</div>
                    ))}
                    {daysWeek.map(day => (
                        <div className={style['weeks-day-text-mob']}>{DaysWeekMobile[day]}</div>
                    ))}
                </div>
                <div className={style['days']}>
                    {daysArr.map(day => (
                        <>
                            {day != 0 && dialogWindowOpen?.day == day && <DiaryDataWindow {...{id: user?.id, date: {year: activeYear, month: activeMonth+1, day: day} }} closeWindow={setDialogWindowOpen} />}
                            <div className={style.cell} onClick={() => setDialogWindowOpenFunc(day)}>
                                {day != 0 && <p className={style['cell__day-text']}>{day}</p>}
                                {notes.length > 0&&notes.map((note) =>{
                                    if(new Date(note.note_date).getDate() == day)
                                        return <div className={style['description-circle']}></div>
                                })}
                            </div>
                        </>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className={style.wrapper}>
            <header className={style['header-menu']}>
                <h1 className={style['header-text']}>Календарь</h1>
                <div className={style['tools-menu']}>
                    <div className={style['tools-menu__left-container']}>
                        <button onClick={CalendarToolWorker.ChoosePrevYear}>{'<<'}</button>
                        <button onClick={CalendarToolWorker.ChoosePrevMonth}>{'<'}</button>
                    </div>
                    <div className={style['tools-menu__central-container']}>
                        <p>{Months[activeMonth]} {activeYear}</p>
                    </div>
                    <div className={style['tools-menu__right-container']}>
                        <button onClick={CalendarToolWorker.ChooseNextMonth}>{'>'}</button>
                        <button onClick={CalendarToolWorker.ChooseNextYear}>{'>>'}</button>
                    </div>
                </div>
                <div className={style['back-to-profile-icon']} onClick={() => redirect.sendUserTo('/home')}><FaRegUser /></div>
            </header>
            <div className={style.calendar}>
                {renderCalendar()}
            </div>
        </div>
    );
}

export default withAuth(Diary);