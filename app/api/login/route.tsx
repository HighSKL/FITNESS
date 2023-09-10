import { NextResponse } from "next/server"
import { sql } from "@vercel/postgres"
import { UserType } from "@/app/types"

export async function GET(req: Request) {
    try {
        await sql`ALTER TABLE Users ADD password varchar(50)`
        //const result = await sql`CREATE TABLE Pets ( Name varchar(255), Owner varchar(255) );`;
        // await sql`INSERT INTO Pets(Name, Owner) VALUES ('oleg', 'Jimmy');`
        // const pets = await sql`SELECT * FROM Pets`;
        return NextResponse.json({  }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }



    // const { searchParams } = new URL(req.url)

    // const [email, password] = [searchParams.get('e'),searchParams.get('p')]

    //let currentUser: UserType|undefined|{} = users.find((user: UserType)=> user.email == email&&user.password == password)

    //return NextResponse.json(currentUser==undefined?null:currentUser)

    return NextResponse.json({})
}