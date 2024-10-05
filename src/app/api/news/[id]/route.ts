import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET({params}: {params: {id: string}}) {
    try {
        const newQuery = await sql`
        SELECT * FROM news WHERE id = ${parseInt(params.id)}
        `;
        return NextResponse.json(newQuery.rows);
    } catch(error) {
        console.log("Error fetching new details:", error);
        return NextResponse.json({error: "Failed to fetch new details"},{status: 500});
    }
    
}