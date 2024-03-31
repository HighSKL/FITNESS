import { NextResponse } from "next/server"
import { sql } from "@vercel/postgres";
import { DecodedUserType } from "@/app/types";
import authMiddleware from "../../../middlewares/authMiddleware";

export async function GET(req: Request, res: Response) {

    const decodedUser = await authMiddleware()
    if(decodedUser instanceof Error)
        return NextResponse.json(decodedUser, {status: decodedUser.status})

    const userData = await sql`select * from users_data where id = ${(decodedUser as DecodedUserType).userID}`

    return NextResponse.json({status: 200, data: userData.rows[0]})
}
