import { NextResponse } from "next/server";
import { cookies } from "next/headers"
import apiErrors from "../errorsCode/apiErrors";
import jwt from "jsonwebtoken"
import { secretToken } from "@/config";
import { DecodedUserType } from "@/app/types";

export default async function(){
    const token = await cookies().get('refreshToken')?.value

    if(!token)
        return apiErrors.UserNotAuthorized();

    try {
        var DecodedUser = await jwt.verify(token, secretToken)
        return DecodedUser as DecodedUserType
    } catch (err: any) {
        return apiErrors.ExternalError("Не валидный токен")
    }
}