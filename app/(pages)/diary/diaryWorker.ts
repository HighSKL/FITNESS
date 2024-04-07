import { addNote, getNotes } from '@/app/( RestApi )/api_services/diary/service';

export class diaryWorker {
    static addNewNote = async (day: number, month: number, year: number, value: string) => {
        await addNote( day, month, year, value)
    }
    static getTodayDate = () => {
        const today = new Date();
        return { day: today.getDate(), month: today.getMonth()+1, year: today.getFullYear()}
    }
    static getNotes = async (userId: number, month: number, year: number) => ( 
        await getNotes(userId, month, year).then(res=>res.data)
    )
}