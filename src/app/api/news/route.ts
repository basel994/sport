import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const headers = request.headers;
    headers.get("Accept");
    try {
        const newsQuery = await sql`
        SELECT * FROM news
        `;
        return NextResponse.json(newsQuery.rows);
    } catch(error) {
        console.log("Error fetching news:", error);
        return NextResponse.json({error: "Failed to fetch news"},{status: 500});
    }
    
}