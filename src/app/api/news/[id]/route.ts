import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest,{params}: {params: {id: string}}) {
    try {
        const headers = request.headers;
        headers.get("Accept");
        const newQuery = await sql`
        SELECT * FROM news WHERE id = ${parseInt(params.id)}
        `;
        return NextResponse.json(newQuery.rows);
    } catch(error) {
        console.log("Error fetching new details:", error);
        return NextResponse.json({error: "Failed to fetch new details"},{status: 500});
    }
    
}