import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    const body = await req.json();
    await sql`INSERT INTO Users (Id, Username, Login, Password) VALUES (${Math.floor(Math.random()*999)} ,${body.username}, ${body.email}, ${body.password});`
    const users = await sql`SELECT * FROM Users`
    return NextResponse.json({status:200})
}