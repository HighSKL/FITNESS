import useInput from '@/app/Assets/Hooks/useInput';
import style from './style.module.scss'
import { diaryWorker } from '@/app/(pages)/diary/diaryWorker';
import { useEffect, useState } from 'react';
import { changeActiveNoteDescription, getCurrentNote } from '@/app/( RestApi )/api_services/diary/service';
import { NoteType } from '@/app/types';
import Router from '@/app/Assets/CustomRouter/router';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/(storage)/store';

function DiaryBlock() {

    const diaryInputText = useInput('')

    const router = new Router()

    const user = useSelector((state: RootState) => state.userData.user )
    const [requestSended, setRequestSended] = useState(false)
    const [chosenNote, setChosenNote] = useState<NoteType | null>(null)

    useEffect(() => {
        (async () => {
            const { day, month, year } = diaryWorker.getTodayDate()
            if (user) {
                const note = await getCurrentNote( day, month, year).then(res => res.data)
                if (note.length != 0) {
                    setChosenNote(note[0])
                    diaryInputText.setValue(note[0].description)
                }
            }
        })()
    }, [])


    const addDiary = async () => {
        const { day, month, year } = diaryWorker.getTodayDate()
        setRequestSended(true)
        if (user) {
            diaryWorker.addNewNote(day, month, year, diaryInputText.value).then(() => setRequestSended(false))

            const note = await getCurrentNote(day, month, year).then(res => res.data)
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

    const Conditions = {
        disabledChangeNoteDesc:
            requestSended || diaryInputText.value == '' || chosenNote?.description == diaryInputText.value,
        disabledAddNoteDesc: 
            diaryInputText.value == '' || requestSended
    }

    return (
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
    );
}

export default DiaryBlock;