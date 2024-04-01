import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    await cookies().delete("refreshToken")
    return NextResponse.json({status: 200})
}