import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers'
import jwt from "jsonwebtoken"
import { secretToken } from "@/config";
import apiErrors from "../../errorsCode/apiErrors";

export async function POST(req:Request){
    const body = await req.json();

    const candidateUser = await sql`select * from users_data WHERE email = ${body.email}`

    if(candidateUser.rows.length > 0)
        return NextResponse.json(apiErrors.EmailAlreadyExists())

    
    const hashPassword = await bcrypt.hash(body.password, 2)
    const userId = Math.floor(Math.random()*999)

    let refreshToken = jwt.sign({userID: userId, email: body.email}, secretToken , {expiresIn: '10d'})

    await sql
        `INSERT INTO users_data (Id, Username, Email, isWellcomeBriefingComplete) VALUES
         (${userId} ,${body.username}, ${body.email}, ${false});`
    await sql
        `insert into special_users_data(id, email, password,refresh_token) values
         (${userId}, ${body.email}, ${hashPassword}, ${refreshToken});`

    cookies().set("refreshToken", refreshToken, {maxAge: 30*24*60*60*1000, httpOnly:false})
    
    return NextResponse.json({status:200})
}