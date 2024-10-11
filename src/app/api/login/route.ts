import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

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
            email: userQuery.rows[0].email,
            role: userQuery.rows[0].role},
            secret,
            {expiresIn: '1h'});
            const cookiesStore = cookies();
            cookiesStore.set("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 3600,
                path: '/'
            });
        return NextResponse.json({name: userQuery.rows[0].name, role: userQuery.rows[0].role, image: userQuery.rows[0].image});
    } catch(error) {
        console.log(error);
        return NextResponse.json({error: "Error logging in"})
    }
}