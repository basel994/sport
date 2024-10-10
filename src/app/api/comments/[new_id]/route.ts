import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, {new_id}: {new_id: string}) {
    const headers = request.headers;
    headers.get("Accept");
    try {
        const commentsQuery = await sql`
        SELECT * FROM comments WHERE new_id = ${new_id}
        `;
        return NextResponse.json(commentsQuery.rows);
    } catch(error) {
        console.log("Error fetching comments:", error);
        return NextResponse.json({error: "Failed to fetch comments"},{status: 500});
    }
    
}