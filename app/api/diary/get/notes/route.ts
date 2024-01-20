import { sql } from "@vercel/postgres"
import { NextResponse } from "next/server"

export async function GET(req: Request, res: Response){

    let { searchParams } = new URL(req.url)

    const user_id = searchParams.get('id')
    const year = searchParams.get('year')
    const month = searchParams.get('month')
    const day = searchParams.get('day')

    if(day){
        var notes = await sql`SELECT * FROM calendar_notes WHERE user_id = ${user_id} AND
        EXTRACT(DAY FROM note_date) = ${day} AND 
        EXTRACT(MONTH FROM note_date) = ${month} AND 
        EXTRACT(YEAR FROM note_date) = ${year}`
    }
    else{
        var notes = await sql`SELECT * FROM calendar_notes WHERE user_id = ${user_id} AND 
        EXTRACT(MONTH FROM note_date) = ${month} AND 
        EXTRACT(YEAR FROM note_date) = ${year}`
    }

    return NextResponse.json({status: 200, data: notes.rows})
}
