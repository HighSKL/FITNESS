import withModalWindow from '@/app/Assets/Hocs/ModalWindow/withModalWindow';
import style from './style.module.scss';
import React, {useRef, useState} from 'react';
import {IoIosArrowDown, IoIosArrowUp, IoIosClose} from "react-icons/io";

function Food() {
    const trainings = [
        {name: "Курица", caloriesPerHour: 100},
        {name: "Бургер", caloriesPerHour: 400},
        {name: "Салат из овощей с маслом", caloriesPerHour: 200},
    ]

    const historyTraining = [
        {
            date: "11.12.2024",
            spendedCalories: 2000,
            trainings: [
                {
                    name: "Курица",
                    mass: "125"
                },
                {
                    name: "Салат из овощей с маслом",
                    mass: "300"
                }
            ]
        },
        {
            date: "11.12.2024",
            spendedCalories: 932,
            trainings: [
                {
                    name: "Салат из овощей с маслом",
                    mass: "254"
                },
                {
                    name: "Бургер",
                    mass: "200"
                }
            ]
        }
    ]

    const [calories, setCalories] = useState(0);
    const [doneTrainings, setDoneTrainings] = useState<any>([]);
    const [addMode, setAddMode] = useState(false);

    const massRef = useRef(null)
    const minutesRef = useRef(null)
    const [trainName, setTrainName] = useState(trainings[0].name);

    const renderDoneTraining = doneTrainings.map((training: any) => (
        <div className={style.blk} style={{textAlign: 'center'}}>
            <p>{training.name}</p>
            <p>Калории</p>
            <p>{training.spendedCalories}</p>
        </div>
    ))

    const renderHistoryTraining = historyTraining.map((training) => {
        const [showTrains, setShowTrains] = useState(false)
        return (<div className={style.history}>
            <div style={{display: 'flex', gap: "10px", alignItems: 'center'}}>
                <p>{training.date}</p>
                <p>Калории: {training.spendedCalories}</p>
                {showTrains ? <IoIosArrowUp onClick={() => {
                    setShowTrains(false)
                }}/> : <IoIosArrowDown onClick={() => {
                    setShowTrains(true)
                }}/>}
            </div>
            {showTrains &&
                <div style={{display: "flex", gap: "10px", marginTop: "10px"}}>{training.trainings.map((val) => <div
                    className={style.blk}>
                    <p>{val.name}</p>
                    <p>{val.mass}</p>
                </div>)}</div>}
        </div>)
    })

    const addDoneTraining = () => {

        const renderOptions = trainings.map((training) => (
            <option value={training.name}>{training.name}</option>
        ))

        const add = () => {
            const trainIndex = (trainings.filter(val => val.name == trainName))[0]
            const calcCal = Math.floor(trainIndex.caloriesPerHour * (parseFloat(`${massRef.current && massRef.current['value']}`)/100))
            setCalories(prevState => prevState + calcCal)
            setDoneTrainings((prevState: any[]) =>
                [...prevState, {
                    name: trainName,
                    spendedCalories: calcCal,
                    mass: massRef.current && massRef.current['value'],
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
                <div className={style.inputs_cont}>
                    <div className={style.input}>
                        <p>Масса блюда (гр.)</p>
                        <input type="text" ref={massRef}/>
                    </div>
                </div>
                <button onClick={add}>Добавить прием пищи</button>
            </div>
        </div>
    }

    const addCalories = () => setCalories(prevState => prevState + 50)
    const minCalories = () => calories >= 50 && setCalories(prevState => prevState - 50)

    return (
        <div className={style.wrapper}>
            <h1>Еда</h1>
            <div className={style.tools}>
                <button onClick={minCalories}>-</button>
                <div className={style['water-container']}>
                    <p>{calories}</p>
                </div>
                <button className={style.add} onClick={addCalories}>+</button>
            </div>
            <div className={style['trainings-block']}>
                {!addMode && <p className={style.add_train} onClick={() => setAddMode(true)}>+ Добавить прием пищи</p>}
                {addMode && addDoneTraining()}
                <div style={{marginTop: "10px", display: "flex", gap: '10px'}}>
                    {renderDoneTraining}
                </div>
            </div>
            <div className={style['train-container']}>
                <p className={style.title}>Потребление калорий в другие дни</p>
                <div className={style.container}>
                    {renderHistoryTraining}
                </div>
            </div>
        </div>
    );
}

export default withModalWindow(Food);