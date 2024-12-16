import withModalWindow from '@/app/Assets/Hocs/ModalWindow/withModalWindow';
import style from './style.module.scss';
import React, {useRef, useState} from 'react';
import {IoIosClose, IoIosArrowDown, IoIosArrowUp} from "react-icons/io";


function Training() {

    const trainings = [
        {name: "Бег", caloriesPerHour: 100},
        {name: "Приседания", caloriesPerHour: 50},
        {name: "Жим лежа", caloriesPerHour: 120},
    ]

    const historyTraining = [
        {
            date: "11.12.2024",
            spendedCalories: 874,
            trainings: [
                {
                    name: "Бег",
                    hours: "01",
                    minutes: "20"
                },
                {
                    name: "Приседания",
                    hours: "00",
                    minutes: "02"
                }
            ]
        },
        {
            date: "11.12.2024",
            spendedCalories: 874,
            trainings: [
                {
                    name: "Бег",
                    hours: "00",
                    minutes: "25"
                },
                {
                    name: "Жим лежа",
                    hours: "02",
                    minutes: "05"
                }
            ]
        }
    ]

    const [calories, setCalories] = useState(0);
    const [doneTrainings, setDoneTrainings] = useState<any>([]);
    const [addMode, setAddMode] = useState(false);

    const hoursRef = useRef(null)
    const minutesRef = useRef(null)
    const [trainName, setTrainName] = useState(trainings[0].name);

    const renderDoneTraining = doneTrainings.map((training:any) => (
        <div className={style.blk} style={{textAlign:'center'}}>
            <p>{training.name}</p>
            <p>Калории</p>
            <p>{training.spendedCalories}</p>
        </div>
    ))

    const renderHistoryTraining = historyTraining.map((training)=> {
        const [showTrains, setShowTrains] = useState(false)
        return (<div className={style.history}>
            <div style={{display: 'flex', gap: "10px", alignItems: 'center'}}>
                <p>{training.date}</p>
                <p>Соженные калории: {training.spendedCalories}</p>
                {showTrains ? <IoIosArrowUp onClick={() => {
                    setShowTrains(false)
                }}/> : <IoIosArrowDown onClick={() => {
                    setShowTrains(true)
                }}/>}
            </div>
            {showTrains&&<div style={{display:"flex", gap: "10px", marginTop: "10px"}}>{training.trainings.map((val) => <div className={style.blk}>
                <p>{val.name}</p>
                <p>{val.hours}:{val.minutes}</p>
            </div>)}</div>}
        </div>)
    })

    const addDoneTraining = () => {

        const renderOptions = trainings.map((training) => (
            <option value={training.name}>{training.name}</option>
        ))

        const add = () => {
            const trainIndex = (trainings.filter(val => val.name == trainName))[0]
            const calcCal = Math.floor(trainIndex.caloriesPerHour * parseFloat(`${hoursRef.current&&hoursRef.current['value']}.${minutesRef.current && minutesRef.current['value']}`))
            setCalories(prevState => prevState+calcCal)
            setDoneTrainings((prevState:any[]) =>
                [...prevState, {
                    name: trainName,
                    spendedCalories: calcCal,
                    hours: hoursRef.current && hoursRef.current['value'],
                    minutes: minutesRef.current && minutesRef.current['value']
                }]
            )
            setAddMode(false)
        }

        const change = (event: React.ChangeEvent<HTMLSelectElement>) => setTrainName(event.target.value)

        return <div className={style['add-training']}>
            <IoIosClose onClick={() => setAddMode(false)}/>
            <select name="" id="" onChange={change}>
                {renderOptions}
            </select>
            <div className={style.cont_cont}>
                <p>Укажите время выполнения</p>
                <div className={style.inputs_cont}>
                    <div className={style.input}>
                        <p>Часы</p>
                        <input type="text" ref={hoursRef}/>
                    </div>
                    <div className={style.input}>
                        <p>Минуты</p>
                        <input type="text" ref={minutesRef}/>
                    </div>
                </div>
                <button onClick={add}>Добавить упражненине</button>
            </div>
        </div>
    }

    const addCalories = () => setCalories(prevState => prevState + 20)
    const minCalories = () => calories >= 20 && setCalories(prevState => prevState - 20)

    return (
        <div className={style.wrapper}>
            <h1>Тренировки</h1>
            <div className={style.tools}>
                <button onClick={minCalories}>-</button>
                <div className={style['water-container']}>
                <p>{calories}</p>
                </div>
                <button className={style.add} onClick={addCalories}>+</button>
            </div>
            <div className={style['trainings-block']}>
                {!addMode && <p className={style.add_train} onClick={() => setAddMode(true)}>+ Добавить упражнение</p>}
                {addMode && addDoneTraining()}
                <div style={{marginTop: "10px", display:"flex", gap: '10px'}}>
                    {renderDoneTraining}
                </div>
            </div>
            <div className={style['train-container']}>
                <p className={style.title}>История тренировок</p>
                <div className={style.container}>
                    {renderHistoryTraining}
                </div>
            </div>
        </div>
    );
}

export default withModalWindow(Training);