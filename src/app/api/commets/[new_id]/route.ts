import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, {new_id}: {new_id: string}) {
    const headers = request.headers;
    headers.get("Accept");
    try {
        const commetsQuery = await sql`
        SELECT * FROM commets WHERE new_id = ${new_id}
        `;
        return NextResponse.json(commetsQuery.rows);
    } catch(error) {
        console.log("Error fetching commets:", error);
        return NextResponse.json({error: "Failed to fetch commets"},{status: 500});
    }
    
}