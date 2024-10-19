import { sql } from "@vercel/postgres";  
import { NextRequest, NextResponse } from "next/server"; 
import cloudinary from "cloudinary"; 

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {  
    const token = request.cookies.get("token");  
 
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

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {  
    const token = request.cookies.get("token");  
 
    if (!token) {  
        return NextResponse.json({ error: "Unauthorized: No token provided" }, { status: 401 });  
    }  
    const formData = await request.formData();
    const newContent = formData.get("newContent") as string;
    const oldImage = formData.get("oldImage") as string;
    const newImage = formData.get("newImage") as File;
    try {  
        if(!newImage){
            if(oldImage) {
                const result = await sql`  
                UPDATE comments
                SET content = ${newContent}  
                WHERE id = ${parseInt(params.id)}  
                RETURNING *  
                `;
                if (result.rows.length === 0) {  
                  return NextResponse.json({ error: "Comment not found" }, { status: 404 });  
                }  
    
                return NextResponse.json({ message: "Comment has been updated" }, { status: 200 }); 
            } 
            else {
                const result = await sql`  
                UPDATE comments
                SET content = ${newContent}, 
                image = ${null} 
                WHERE id = ${parseInt(params.id)}  
                RETURNING *  
                `;
                if (result.rows.length === 0) {  
                  return NextResponse.json({ error: "Comment not found" }, { status: 404 });  
                }  
    
                return NextResponse.json({ message: "Comment has been updated" }, { status: 200 }); 
            } 
        }
        else {
            cloudinary.v2.config({  
                cloud_name: process.env.CLOUDINARY_CLOUD_NAME,  
                api_key: process.env.CLOUDINARY_API_KEY,  
                api_secret: process.env.CLOUDINARY_API_SECRET,  
            });
            type CloudinaryResponse = {  
                secure_url: string;  
              } 
              const arrayBuffer = await newImage.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);
                const uploadResultPromise = new Promise<CloudinaryResponse>((resolve, reject) => {  
                    const uploadStream = cloudinary.v2.uploader.upload_stream({   
                      resource_type: 'auto'  
                    }, (error, result) => {  
                      if (error) {  
                        reject(error);  
                      } else {  
                        resolve(result as CloudinaryResponse);  
                      }  
                    });  
              
                    uploadStream.end(buffer);  
                  });
                  const uploadResult = await uploadResultPromise;
                  const res = await sql`  
                  UPDATE comments
                  SET content = ${newContent},
                  image = ${uploadResult.secure_url} 
                  WHERE id = ${parseInt(params.id)}  
                  RETURNING * 
                  `;  
                  if (res.rows.length === 0) {  
                    return NextResponse.json({ error: "Comment not found" }, { status: 404 });  
                }  
        
                return NextResponse.json({ message: "Comment has been updated" }, { status: 200 });            
        }  
 

    } catch (error) {  
        console.error('Error during update process:', error);  
        return NextResponse.json({ error: "Something went wrong during update process!" }, { status: 500 });  
    }  
}