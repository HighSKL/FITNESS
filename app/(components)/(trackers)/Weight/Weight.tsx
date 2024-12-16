import withModalWindow from '@/app/Assets/Hocs/ModalWindow/withModalWindow';
import style from './style.module.scss';
import React, {useRef, useState} from 'react';
import {IoIosArrowDown, IoIosArrowUp, IoIosClose} from "react-icons/io";

function Weight() {

    const historyTraining = [
        {
            date: "11.12.2024",
            bilo: "35",
            stalo: "32.5"
        },
        {
            date: "11.12.2024",
            bilo: "32.5",
            stalo: "35"
        }
    ]

    const [kg, setKg] = useState(30);
    const [gr, setGr] = useState(0);

    const hoursRef = useRef(null)
    const minutesRef = useRef(null)


    const renderHistoryTraining = historyTraining.map((training) => {
        const [showTrains, setShowTrains] = useState(false)
        return (<div className={style.history}>
            <div style={{display: 'flex', gap: "10px", alignItems: 'center'}}>
                <p>{training.date}</p>
                <p>Изначальный вес: {training.bilo} кг</p>
                <p>Вес после изменений: {training.stalo} кг</p>
            </div>
        </div>)
    })


    const addKg = () => setKg(prevState => prevState + 1)
    const minKg = () => kg >= 1 && setKg(prevState => prevState - 1)
    const addGr = () => gr < 900&&setGr(prevState => prevState + 100)
    const minGr = () => gr >= 100 && setGr(prevState => prevState - 100)

    return (
        <div className={style.wrapper}>
            <h1>Показатели веса</h1>
            <div style={{display: 'flex', justifyContent:'center'}}>
                <div style={{display: 'flex', margin: 'auto', alignItems: 'center'}}>
                    <div className={style.tools}>
                        <button className={style.add} onClick={addKg}>+</button>
                        <div className={style['water-container']}>
                            <p>{kg}</p>
                        </div>
                        <button className={style.mins} onClick={minKg}>-</button>
                    </div>
                    <p>Кг</p>
                    <div className={style.tools}>
                        <button className={style.add} onClick={addGr}>+</button>
                        <div className={style['water-container']}>
                            <p>{gr}</p>
                        </div>
                        <button onClick={minGr} className={style.mins}>-</button>
                    </div>
                    <p>Гр</p>
                </div>
            </div>
            <div className={style['train-container']}>
                <p className={style.title}>История изменения веса</p>
                <div className={style.container}>
                    {renderHistoryTraining}
                </div>
            </div>

        </div>
    );
}

export default withModalWindow(Weight);