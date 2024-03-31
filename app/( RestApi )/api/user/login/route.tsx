import { NextResponse } from "next/server"
import bcrypt from 'bcryptjs';
import { sql } from "@vercel/postgres"
import apiErrors from "../../../errorsCode/apiErrors";
import { cookies } from "next/headers";
import { secretToken } from "@/config";
import jwt from "jsonwebtoken"

export async function POST(req: Request, res: Response){
    
    const {email, password} = await req.json()

    const candidateUser = (await sql`select id, password, email from special_users_data where email = ${email}`).rows

    if(candidateUser.length == 0)
        return NextResponse.json(apiErrors.UserNotFound())
    
    const hashPassword = await bcrypt.compare(password, candidateUser[0].password)

    if(!hashPassword)
        return NextResponse.json(apiErrors.InvalidPassword())

    let refreshToken = jwt.sign({userID: candidateUser[0].id, email: candidateUser[0].email}, secretToken , {expiresIn: '10d'})

    await sql`UPDATE special_users_data SET refresh_token = ${refreshToken} WHERE id = ${candidateUser[0].id}`

    cookies().set("refreshToken", refreshToken, {maxAge: 30*24*60*60*1000, httpOnly:false})

    return NextResponse.json({ status: 200 });
}