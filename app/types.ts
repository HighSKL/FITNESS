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
    isWellcomeBriefingComplete: boolean;
}
