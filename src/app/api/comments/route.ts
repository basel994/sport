import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "cloudinary";
import { sql } from "@vercel/postgres";
import { jwtDecode } from "jwt-decode";
import { UserType } from "@/types/users/usersType";

cloudinary.v2.config({  
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,  
    api_key: process.env.CLOUDINARY_API_KEY,  
    api_secret: process.env.CLOUDINARY_API_SECRET,  
});
type CloudinaryResponse = {  
    secure_url: string;  
  } 
export async function POST(request: NextRequest) {
    const cookiesStor = cookies();
    const token = cookiesStor.get("token");
    if(token) {
        const decoded  = jwtDecode(token.value) as UserType;
        const comment_user_id = decoded.id;
        const formData = await request.formData();
        const comment_new_id = formData.get("new_id") as string;
        const comment_content = formData.get("content") as string;
        const comment_image = formData.get("image") as File;
        try {
            if(comment_image) {
                const arrayBuffer = await comment_image.arrayBuffer();
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
                  INSERT INTO comments(new_id, user_id, content, image)   
                  VALUES (${parseInt(comment_new_id)}, ${comment_user_id}, ${comment_content}, ${uploadResult.secure_url})  
                  RETURNING id;  
                `;  
                return NextResponse.json({ id: res.rows[0].id, message: 'your comment has been saved successfully' }, { status: 201 }); 
            }
            else {
                const res = await sql`  
                INSERT INTO comments(new_id, user_id, content)   
                VALUES (${parseInt(comment_new_id)}, ${comment_user_id}, ${comment_content})  
                RETURNING id;  
              `;  
              return NextResponse.json({ id: res.rows[0].id, message: 'your comment has been saved successfully' }, { status: 201 }); 
            }
 
        } catch(error) {
            console.error(error);  
            return NextResponse.json({ message: 'Failed to create comment' }, { status: 500 }); 
        }


    }
    else {
        return NextResponse.json({ message: 'Authentication error' }, { status: 500 }); 
    }
}