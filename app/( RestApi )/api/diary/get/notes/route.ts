import authMiddleware from "@/app/( RestApi )/middlewares/authMiddleware"
import { DecodedUserType } from "@/app/types"
import { sql } from "@vercel/postgres"
import { NextResponse } from "next/server"

export async function GET(req: Request, res: Response){

    let { searchParams } = new URL(req.url)

    const decodedUser = await authMiddleware()
    if(decodedUser instanceof Error)
        return NextResponse.json(decodedUser, {status: decodedUser.status})
    
    const year = searchParams.get('year')
    const month = searchParams.get('month')
    const day = searchParams.get('day')

    if(day){
        var notes = await sql`SELECT id, description, note_date FROM calendar_notes WHERE user_id = ${(decodedUser as DecodedUserType).userID} AND
        EXTRACT(DAY FROM note_date) = ${day} AND 
        EXTRACT(MONTH FROM note_date) = ${month} AND 
        EXTRACT(YEAR FROM note_date) = ${year}`
    }
    else{
        var notes = await sql`SELECT id, description, note_date FROM calendar_notes WHERE user_id = ${(decodedUser as DecodedUserType).userID} AND 
        EXTRACT(MONTH FROM note_date) = ${month} AND 
        EXTRACT(YEAR FROM note_date) = ${year}`
    }

    return NextResponse.json({status: 200, data: notes.rows})
}
