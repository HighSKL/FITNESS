import { sql } from "@vercel/postgres"
import { NextResponse } from "next/server"

export async function PUT(req: Request){

    const body = await req.json()

    console.log(body.note_id)

    await sql`UPDATE calendar_notes SET description = ${body.description} where id = ${body.note_id}`

    return NextResponse.json({status: 200})
}