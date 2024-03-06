import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function PUT(req: Request){
    const body = await req.json()

    if(body.weight)
        await sql`UPDATE users_data SET weight = ${body.weight} WHERE id = ${body.user_id}`
    if(body.height)
        await sql`UPDATE users_data SET height = ${body.height} WHERE id = ${body.user_id}`

    return NextResponse.json({status: 200})
}