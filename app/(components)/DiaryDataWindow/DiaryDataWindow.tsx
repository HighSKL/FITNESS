'use client'
import withModalWindow from '@/app/Assets/Hocs/ModalWindow/withModalWindow';
import { changeActiveNoteDescription, deleteNoteDescription, getCurrentNote } from '@/app/Assets/api_services/diary/service';
import { MonthsRusLang } from '@/app/Assets/enums';
import { useEffect, useState } from 'react';
import style from './style.module.scss'
import { NoteType } from '@/app/types';
import ComponentPreloader from '@/app/Assets/ComponentPreloader/ComponentPreloader';
import useInput from '@/app/Assets/Hooks/useInput';
import { diaryWorker } from '@/app/(pages)/diary/diaryWorker';
import { FaRegTrashCan } from "react-icons/fa6";

type PropsType = {
    id: number
    date: {
        year: number, month: number, day: number
    }
    closeWindow: any
}

function DiaryDataWindow(props: PropsType) {

    const [chosenNote, setChosenNote] = useState<NoteType | null>(null)

    const [preloaderActive, setPreloaderActive] = useState(true)
    const [requestSended, setRequestSended] = useState(false)

    const descTextarea = useInput('')

    const addNewNote = async () => {
        setRequestSended(true)
        diaryWorker.addNewNote(props.id, props.date.day, props.date.month, props.date.year, descTextarea.value).then(() => {
            setRequestSended(false)
        })
    }

    const changeNoteDescription = async () => {
        setRequestSended(true)
        chosenNote && await changeActiveNoteDescription( chosenNote.id, descTextarea.value ).then(() =>
            setRequestSended(false)
        )
    }

    const deleteNote = async () => {
        chosenNote && await deleteNoteDescription( chosenNote.id ).then(()=>{
            props.closeWindow()
        })
    }

    useEffect(() => {
        (async () => {
            const note = await getCurrentNote(props.id, props.date.day, props.date.month, props.date.year).then(res => res.data)
            if (note.length != 0){
                setChosenNote(note[0])
                descTextarea.setValue(note[0].description)
            }
            setPreloaderActive(false)
        })()
    }, [])

    return (
        <div className={style.wrapper}>
            {chosenNote&&<div className={style['delete-note']} onClick={deleteNote}><FaRegTrashCan /><p>Удалить</p></div>}
            <h1 className={style['date-title']}>{props.date.day} {MonthsRusLang[props.date.month]}</h1>
            {!preloaderActive && <textarea name="" {...descTextarea} className={style['diary-note__textarea']} placeholder='Начните вводить новую заметку' />}
            {preloaderActive && <ComponentPreloader width='100%' height='5vh' style={{ marginTop: '50px' }} />}
            <div className={style.button__container}>
                {chosenNote ? !preloaderActive &&
                    <button 
                    style={{ opacity: (descTextarea.value == '' || descTextarea.value == chosenNote.description) ? '0%' : '100%' }} 
                    disabled={(descTextarea.value == '' || descTextarea.value == chosenNote.description) || requestSended ? true : false} 
                    onClick={changeNoteDescription} className={style['send-request__button']}> Изменить </button> :
                    !preloaderActive && <button style={{ opacity: descTextarea.value == '' ? '0%' : '100%' }} disabled={descTextarea.value == '' || requestSended ? true : false} onClick={addNewNote} className={style['send-request__button']}>Добавить заметку</button>}
                {preloaderActive && <ComponentPreloader height='30px' style={{ marginTop: '10px' }} />}
            </div>
        </div>
    );
}
 
export default withModalWindow(DiaryDataWindow);