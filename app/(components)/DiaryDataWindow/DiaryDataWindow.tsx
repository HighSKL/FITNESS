'use client'
import withModalWindow from '@/app/Assets/Hocs/ModalWindow/withModalWindow';
import { addNote, changeActiveNoteDescription, getCurrentNote } from '@/app/Assets/api_services/diary/service';
import { MonthsRusLang } from '@/app/Assets/enums';
import { useEffect, useRef, useState } from 'react';
import style from './style.module.scss'
import { NoteType } from '@/app/types';
import ComponentPreloader from '@/app/Assets/ComponentPreloader/ComponentPreloader';

type PropsType = {
    id: number
    date: {
        year: number, month: number, day: number
    }
}

function DiaryDataWindow(props: PropsType) {

    const [chosenNote, setChosenNote] = useState<NoteType | null>(null)
    const [textareaValue, setTextareaValue] = useState('')

    const [preloaderActive, setPreloaderActive] = useState(true)
    const [requestSended, setRequestSended] = useState(false)

    const textareaRef = useRef(null)

    const changeTextareaValue = () => {
        const value = textareaRef.current && textareaRef.current['value']
        setTextareaValue(value ? value : '')
    }

    const addNewNote = async () => {
        setRequestSended(true)
        await addNote(props.id, props.date.day, props.date.month, props.date.year, textareaValue).then(() => {
            setRequestSended(false)
        })
    }

    const changeNoteDescription = async () => {
        setRequestSended(true)
        chosenNote && await changeActiveNoteDescription(props.id, chosenNote.id, textareaValue).then(() => {
            setRequestSended(false)
        })
    }

    useEffect(() => {
        (async () => {
            const note = await getCurrentNote(props.id, props.date.day, props.date.month, props.date.year).then(res => res.data)
            if (note.length != 0)
                setChosenNote(note[0])
            setPreloaderActive(false)
        })()
    }, [])

    return (
        <div className={style.wrapper}>
            <h1 className={style['date-title']}>{props.date.day} {MonthsRusLang[props.date.month]}</h1>
            {!preloaderActive && <textarea name="" onChange={changeTextareaValue} ref={textareaRef} className={style['diary-note__textarea']} defaultValue={chosenNote?.description} placeholder='Начните вводить новую заметку' />}
            {preloaderActive && <ComponentPreloader width='100%' height='5vh' style={{ marginTop: '50px' }} />}
            <div className={style.button__container}>
                {chosenNote ? !preloaderActive &&
                <button style={{ opacity: (textareaValue == '' || textareaValue == chosenNote.description) ? '0%' : '100%' }} disabled={(textareaValue == '' || textareaValue == chosenNote.description) || requestSended ? true : false} onClick={changeNoteDescription} className={style['send-request__button']}>Изменить</button> :
                !preloaderActive && <button style={{ opacity: textareaValue == '' ? '0%' : '100%' }} disabled={textareaValue == '' || requestSended ? true : false} onClick={addNewNote} className={style['send-request__button']}>Добавить заметку</button>}
                {preloaderActive && <ComponentPreloader height='30px' style={{ marginTop: '10px' }} />}
            </div>
        </div>
    );
}

export default withModalWindow(DiaryDataWindow);