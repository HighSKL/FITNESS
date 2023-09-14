import { NextResponse } from "next/server"
import { sql } from "@vercel/postgres"

export async function GET(req: Request) {


    return NextResponse.json({ status: 200 });
}