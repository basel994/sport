export const dynamic = "force-dynamic";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
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