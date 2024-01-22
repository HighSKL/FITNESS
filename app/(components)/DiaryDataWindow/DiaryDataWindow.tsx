'use client'
import withModalWindow from '@/app/Assets/Hocs/ModalWindow/withModalWindow';
import { addNote, changeActiveNoteDescription, getCurrentNote } from '@/app/Assets/api_services/diary/service';
import { MonthsRusLang } from '@/app/Assets/enums';
import { useEffect, useRef, useState } from 'react';
import style from './style.module.scss'
import { NoteType } from '@/app/types';

type PropsType = {
    id: number
    date: {
        year: number, month: number, day: number
    }
}

function DiaryDataWindow(props: PropsType) {

    const [chosenNote, setChosenNote] = useState<NoteType|null>(null)
    const [textareaValue, setTextareaValue] = useState('')
    const textareaRef = useRef(null)

    const changeTextareaValue = () => {
        const value = textareaRef.current&&textareaRef.current['value']
        setTextareaValue(value?value:'')
    }

    const addNewNote = async () => await addNote(props.id, props.date.day, props.date.month, props.date.year, textareaValue)

    const changeNoteDescription = async () => chosenNote && await changeActiveNoteDescription(props.id, chosenNote.id, textareaValue)

    useEffect(()=>{
        (async ()=>{
            const note = await getCurrentNote( props.id, props.date.day, props.date.month, props.date.year).then(res=>res.data)
            if(note.length != 0)
                setChosenNote(note[0])
        })()
    }, [])

    return (
        <div className={style.wrapper}>
            <h1 className={style['date-title']}>{props.date.day} {MonthsRusLang[props.date.month]}</h1>
            <textarea name="" onChange={changeTextareaValue} ref={textareaRef} className={style['diary-note__textarea']} defaultValue={chosenNote?.description} placeholder='Начните вводить новую заметку' />
            {chosenNote?
            <button disabled={textareaValue==''&&textareaValue!=chosenNote.description?true:false} onClick={changeNoteDescription}>Изменить</button>:
            <button disabled={textareaValue==''?true:false} onClick={addNewNote}>Добавить заметку</button>}
        </div>
    );
}

export default withModalWindow(DiaryDataWindow);