import { get } from "../requests";

export const getCurrentNote = (id: number,day: number, month: number, year: number) => get('diary/get/notes', { id, day, month, year })