import withModalWindow from '@/app/Assets/Hocs/ModalWindow/withModalWindow';
import style from './style.module.scss';
import React, {useState} from 'react';
import {op_san} from "@/app/Assets/fonts";
import water from '@/imgs/water.png'
import Image from "next/image";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/app/(storage)/store";
import {setTrackersCount} from "@/app/(storage)/reducers/mainDataReducer";

function Water() {

    const dispatch = useDispatch();
    const doneCups = useSelector((state:RootState)=>state.mainData.trackers[1].progress.done)

    const isMale = false
    const height = 182 / 100
    const weight = 75
    const IMT = weight/Math.pow(height, 2)

    const datas = [
        {data: '20.11.2024', cupsCount: 5},
        {data: '21.11.2024', cupsCount: 7},
        {data: '22.11.2024', cupsCount: 5},
        {data: '23.11.2024', cupsCount: 6},
        {data: '24.11.2024', cupsCount: 7},
    ]

    const [dayCups, setDayCups] = useState(doneCups);

    const IMTData = () => {
        if (IMT < 18.5) {
            return {color: "#4a74ff", text: "Недостаточная масса тела", type: 'min'}
        }
        if (IMT >= 18.5 && IMT <= 25) {
            return {color: "#45d859", text: "Нормальная масса тела", type: 'normal'}
        } else {
            return {color: "#d84545", text: "Избыточная масса тела", type: 'many'}
        }
    }

    const normalDayMl = isMale?weight*35:weight*31

    const normalDayL = (normalDayMl / 1000).toFixed(1)

    const cupCount = Math.ceil(normalDayMl / 300)

    const renderImt = () => {
        return(
            <div className={style["imt-block"]}>
                <div className={style.color} style={{backgroundColor:IMTData().color}}></div>
                <p className={style.desc} style={{color: IMTData().color}}>{IMTData().text}</p>
            </div>
        )
    }

    const renderSuccessCups = datas.map((el) => {
        return <tr>
            <th>{el.data}</th>
            <th>{el.cupsCount}</th>
        </tr>
    })

    const addCup = () => {
        dispatch(setTrackersCount({need: cupCount, done: dayCups+1, trackerId: 2}))
        setDayCups(prev => prev+1);

    }

    const minusCup = () => {
        if(!((dayCups-1)>-1))
            return

        dispatch(setTrackersCount({need: cupCount, done: dayCups-1, trackerId: 2}))
        setDayCups(prev => prev-1);
    }

    return (
        <div className={style.wrapper}>
            <div className={op_san.className}>
                <h1>Дневная норма воды {normalDayL}л</h1>
                {renderImt()}
                <div className={style.tools}>
                    <button onClick={minusCup}>-</button>
                    <div className={style['water-container']}>
                        <Image src={water} alt={""} className={style.water}/>
                        <p>{dayCups}/{cupCount}</p>
                    </div>
                    <button className={style.add} onClick={addCup}>+</button>
                </div>
                {dayCups == cupCount &&
                    <p className={`${style.success} ${style.text}`}>Цель выполнена!</p>}
                {dayCups > cupCount &&
                    <p className={`${style.warning} ${style.text}`}>Избыток воды может привести к<br /> отекам и другим{' '}
                неприятным последтвиям</p>}

                <div className={style['result-table']}>
                    <p>Выполнение цели</p>
                    <div className={style['table-container']}>
                        <table>
                            <tr>
                                <th>Дата</th>
                                <th>Выпитое количество стаканов</th>
                            </tr>
                            {renderSuccessCups}
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default withModalWindow(Water);