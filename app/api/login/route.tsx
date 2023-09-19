import { NextRequest, NextResponse } from "next/server"
import bcrypt from 'bcryptjs';
import { sql } from "@vercel/postgres"
import apiErrors from "../errorsCode/apiErrors";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
    
    const {email, password} = await req.json()

    const candidateUser = await sql`select id, password, refresh_token from special_users_data where email = ${email}`

    if(candidateUser.rows.length == 0)
        return NextResponse.json(apiErrors.UserNotFound())
    
    const hashPassword = await bcrypt.compare(password, candidateUser.rows[0].password)

    if(!hashPassword)
        return NextResponse.json(apiErrors.InvalidPassword())

    cookies().set("refreshToken", candidateUser.rows[0].refresh_token, {maxAge: 30*24*60*60*1000, httpOnly:false})

    return NextResponse.json({ status: 200 });
}