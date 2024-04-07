import { DELETE, get, post, put } from "../requests";

//get
export const getCurrentNote = ( day: number, month: number, year: number) => get('diary/get/notes', { day, month, year })
export const getNotes = (id: number, month: number, year: number) => get('diary/get/notes', { id, month, year })
//post
export const addNote = ( day: number, month: number, year: number, description: string) => post('diary/add/note', { day, month, year, description})
//put
export const changeActiveNoteDescription = (note_id: number, description: string) => put('diary/change/note', { note_id, description })
export const deleteNoteDescription = (note_id: number) => DELETE('diary/delete/note', { note_id })