import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { sql } from "@vercel/postgres";
import jwt from "jsonwebtoken"
import { secretToken } from "@/config";
import apiErrors from "../errorsCode/apiErrors";
import { DecodedUserType } from "@/app/types";

export async function GET(req: NextRequest) {
    const token = await cookies().get('refreshToken')?.value

    if(!token){
        return NextResponse.json(apiErrors.UserNotAuthorized())
    }
    try {
        var DecodedUser = await jwt.verify(token, secretToken)
    } catch (err: any) {
        await cookies().delete('refreshToken')
        return NextResponse.json(apiErrors.ExternalError(err.message))
    }

    const userData = await sql`select * from users_data where id = ${(DecodedUser as DecodedUserType).userID}`

    return NextResponse.json(userData.rows[0])
}
