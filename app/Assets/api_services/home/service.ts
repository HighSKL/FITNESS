import { put } from "../requests";

export const setBrief = (isBriefComplite: boolean, user_id: number) => put('user/briefing', { brief: isBriefComplite, user_id})