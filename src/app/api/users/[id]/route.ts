import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest,{params}: {params: {id: string}}) {
    try {
        const headers = request.headers;
        headers.get("Accept");
        const userQuery = await sql`
        SELECT name FROM users WHERE id = ${parseInt(params.id)}
        `;
        return NextResponse.json(userQuery.rows);
    } catch(error) {
        console.log("Error fetching user details:", error);
        return NextResponse.json({error: "Failed to fetch user details"},{status: 500});
    }
    
}