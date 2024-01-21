import withModalWindow from '@/app/Assets/Hocs/ModalWindow/withModalWindow';
import { getCurrentNote } from '@/app/Assets/api_services/diary/service';
import { MonthsRusLang } from '@/app/Assets/enums';
import { useEffect } from 'react';
import style from './style.module.scss'

type PropsType = {
    id: number
    date: {
        year: number, month: number, day: number
    }
}

function DiaryDataWindow(props: PropsType) {

    useEffect(()=>{
        (async ()=>{
            // const note = await getCurrentNote( props.id, props.date.day, props.date.month, props.date.year).then(res=>res.data)
            // if(note.length == 0){ 

            // }
        })()
    }, [])

    return (
        <div>
            <h1 className={style['date-title']}>{props.date.day} {MonthsRusLang[props.date.month]}</h1>
        </div>
    );
}

export default withModalWindow(DiaryDataWindow);