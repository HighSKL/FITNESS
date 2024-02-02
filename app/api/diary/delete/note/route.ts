import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function DELETE(req: Request){

    const body = await req.json();

    await sql`DELETE FROM calendar_notes WHERE id = ${body.note_id}`

    return NextResponse.json({status: 200})
}