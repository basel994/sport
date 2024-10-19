import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

 const checkEmail = async(email: string) => {
    const checkQuery = await sql `
    SELECT email FROM users WHERE email = ${email}
    `;
    if(checkQuery.rows.length > 0) {
        return false;
    }
    else {
        return true;
    }
}
export async function POST(request: NextRequest) {
    const {name, email, password} = await request.json();
    try {
        const callCheck = await checkEmail(email);
        if(!callCheck) {
            return NextResponse.json({error: "Email is already existed!"})
        }
        else {
            const addQuery = await sql `
            INSERT INTO users (name, email, password, role) 
            VALUES (${name}, ${email}, ${password}, "normal") 
            RETURNING id
            `;
            const secret = process.env.JWT_SECRET!;
            const token = jwt.sign({id: addQuery.rows[0].id,
                name: name, 
                email: email,
                role: "normal"},
                secret,
                {expiresIn: '1h'});
                const cookiesStore = cookies();
                cookiesStore.set("token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    maxAge: 3600,
                    path: '/'
                });
                return NextResponse.json({id: addQuery.rows[0].id, name: name, role: "normal", image: null});

        }
    } catch(error) {
        console.log(error);
        return NextResponse.json({error: "Error Register!"});
    }
}