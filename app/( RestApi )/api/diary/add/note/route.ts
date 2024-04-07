import authMiddleware from "@/app/( RestApi )/middlewares/authMiddleware";
import { DecodedUserType } from "@/app/types";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(req: Request){

    const body = await req.json();

    const decodedUser = await authMiddleware()
    if(decodedUser instanceof Error)
        return NextResponse.json(decodedUser, {status: decodedUser.status})

    const noteId = Math.floor(Math.random()*999999)

    const note_date = `${body.year}-${body.month}-${body.day}`

    await sql`INSERT INTO calendar_notes VALUES (${noteId}, ${(decodedUser as DecodedUserType).userID}, ${body.description}, ${note_date})`

    return NextResponse.json({status: 200})
}