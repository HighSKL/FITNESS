export type DecodedUserType = {
    userID: number,
    email: string
}

export type UserDataType = {
    id: number,
    username: string,
    email: string,
    weight: number|null,
    height: number|null,
    userImg: string|null,
    iswellcomebriefingcomplete: boolean;
    status?: number
}

export type ErrorResponesType = {
    status: number,
    message: string
}


export type NoteType = {
    id: number;
    description: string;
    note_date: any;
}