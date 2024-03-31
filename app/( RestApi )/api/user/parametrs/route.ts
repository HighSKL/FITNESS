import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import authMiddleware from "../../../middlewares/authMiddleware";

export async function PATCH(req: Request) {

    const decodedUser = await authMiddleware()
    if (decodedUser instanceof Error) {
        return NextResponse.json(decodedUser, { status: decodedUser.status })
    }

    const body = await req.json()

    if (body.weight && body.height) 
        await sql`UPDATE users_data SET weight = ${body.weight}, height = ${body.height} WHERE id = ${decodedUser.userID}`
    else {
        if (body.weight)
            await sql`UPDATE users_data SET weight = ${body.weight} WHERE id = ${decodedUser.userID}`
        if (body.height)
            await sql`UPDATE users_data SET height = ${body.height} WHERE id = ${decodedUser.userID}`
    }

    return NextResponse.json({ status: 200 })
}