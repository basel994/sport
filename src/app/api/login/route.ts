import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const {email, password} = await request.json();
    try {
        const userQuery = await sql `
        SELECT * FROM users WHERE email=${email} and password=${password}
        `; 
        if(!userQuery.rows[0]) {
            return NextResponse.json({error: "Invalid credentials"})
        }
        return NextResponse.json({message: "Login successful"});
    } catch(error) {
        console.log(error);
        return NextResponse.json({error: "Error logging in"})
    }
}