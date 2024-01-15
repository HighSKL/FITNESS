'use client'
import withAuth from '@/app/Assets/Hocs/withAuth';
import { useEffect, useState } from 'react';
import style from './style.module.scss'
import { DaysWeek, Months } from '@/app/Assets/enums';

export default function Diary() {

    // const activeMonth = new Date().getMonth()
    const [activeYear, setActiveYear] = useState(new Date().getFullYear())
    const [activeMonth, setActiveMonth] = useState((new Date().getMonth()))

    const ChangeActiveMonth = () => {
        setActiveMonth(activeMonth + 1)
    }

    const renderCalendar = () => {
        let DayWeek = 3
        if((activeMonth+1)>9){
            DayWeek = new Date(`${activeYear}-${activeMonth+1}-01`).getDay();
        }
        else
            DayWeek = new Date(`${activeYear}-0${activeMonth+1}-01`).getDay();
        const DaysInMonth = new Date(activeYear, activeMonth + 1, 0).getDate();

        const daysArr = Array.from(Array(DaysInMonth+1).keys()).slice(1)
        
        if(DayWeek == 0){
            for(let i = 0; i < 6; i++)
                daysArr.unshift(0)
        }
        else{
            for(let i = 0; i < DayWeek-1; i++)
                daysArr.unshift(0)
        }

        const daysweek = [1, 2, 3, 4, 5, 6, 0]

        return (
            <>
                <div className={style.cells}>
                    {daysweek.map(day=>(
                        <div>{DaysWeek[day]}</div>
                    ))}
                    {daysArr.map(day=>(
                        <div className={style.cell}>
                            {day!=0&&<div>{day}</div>}
                        </div>
                    ))}
                </div>
            </>

            // <div>{}</div>
        )
    }
    useEffect(() => {
        console.log(new Date(1, 2).getDay())
    }, [])

    return (
        <div className={style.wrapper}>
            <header className={style['header-menu']}>
                <h1 className={style['header-text']}>Календарь</h1>
                <div className={style['tools-menu']}>
                    <button>{'<<'}</button>
                    <button>{'<'}</button>
                    <p>{Months[activeMonth]}</p>
                    <p>{" "+activeYear}</p>
                    <button onClick={ChangeActiveMonth}>{'>'}</button>
                    <button>{'>>'}</button>
                </div>
            </header>
            <div className={style.calendar}>

                {renderCalendar()}
            </div>
        </div>
    );
}

// export default withAuth(Diary);