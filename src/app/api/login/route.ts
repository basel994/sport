import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
    const {email, password} = await request.json();
    try {
        const userQuery = await sql `
        SELECT * FROM users WHERE email=${email} and password=${password}
        `; 
        if(!userQuery.rows[0]) {
            return NextResponse.json({error: "Invalid credentials"})
        }
        const secret = process.env.JWT_SECRET!;
        const token = jwt.sign({id: userQuery.rows[0].id,
            name: userQuery.rows[0].name, 
            role: userQuery.rows[0].role},
            secret,
            {expiresIn: '1h'});
        return NextResponse.json({token});
    } catch(error) {
        console.log(error);
        return NextResponse.json({error: "Error logging in"})
    }
}