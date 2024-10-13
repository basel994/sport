import { sql } from "@vercel/postgres";  
import { NextRequest, NextResponse } from "next/server";  

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {  
    const headers = request.headers;  
    const token = headers.get("token");  
 
    if (!token) {  
        return NextResponse.json({ error: "Unauthorized: No token provided" }, { status: 401 });  
    }  

    try {  
        const result = await sql`  
            DELETE FROM comments   
            WHERE id = ${parseInt(params.id)}  
            RETURNING *  
        `;  
 
        if (result.rows.length === 0) {  
            return NextResponse.json({ error: "Comment not found" }, { status: 404 });  
        }  

        return NextResponse.json({ message: "Comment has been deleted" }, { status: 200 });  
    } catch (error) {  
        console.error('Error during delete process:', error);  
        return NextResponse.json({ error: "Something went wrong during delete process!" }, { status: 500 });  
    }  
}