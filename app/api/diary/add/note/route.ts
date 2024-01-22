import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(req: Request){

    const body = await req.json();

    const noteId = Math.floor(Math.random()*999999)

    const note_date = `${body.year}-${body.month}-${body.day}`

    await sql`INSERT INTO calendar_notes VALUES (${noteId}, ${body.user_id}, ${body.description}, ${note_date})`

    return NextResponse.json({status: 200})
}