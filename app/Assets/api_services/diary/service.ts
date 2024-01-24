import { get, post, put } from "../requests";

//get
export const getCurrentNote = (id: number, day: number, month: number, year: number) => get('diary/get/notes', { id, day, month, year })
export const getNotes = (id: number, month: number, year: number) => get('diary/get/notes', { id, month, year })
//post
export const addNote = (user_id: number, day: number, month: number, year: number, description: string) => post('diary/add/note', { user_id, day, month, year, description})
//put
export const changeActiveNoteDescription = (user_id: number, note_id: number ,description: string) => put('diary/change/note', { user_id, note_id, description})