import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function PUT(req: Request){

    const body = await req.json()

    await sql`UPDATE users_data SET iswellcomebriefingcomplete=${body.brief} where id = ${body.user_id}`

    return NextResponse.json({status: 200})
}

export async function GET(req: Request){

    let { searchParams } = new URL(req.url)

    const user_id = searchParams.get('id')

    await sql`SELECT iswellcomebriefingcomplete FROM users_data WHERE where id = ${user_id}`

    return NextResponse.json({status: 200})
}