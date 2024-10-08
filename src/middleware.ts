// app/middleware.ts  
import { NextRequest, NextResponse } from 'next/server';  
import { UserType } from '@/types/users/usersType';
import { jwtDecode } from 'jwt-decode';

export function middleware(req: NextRequest) {  
    const token = req.cookies.get("token");
    if (req.nextUrl.pathname.startsWith('/dashboard')) {
            if (token) { 
                try {
                    const decoded  = jwtDecode(token.value) as UserType;
                    if(decoded.role === "admin"){
                        return NextResponse.next(); 
                    }
                    else {
                        return NextResponse.redirect(new URL('/hello', req.url));
                    }
                } catch (err) {  
                    console.log(err);
                    return NextResponse.redirect(new URL('/', req.url));  
                }
            }
            else {
                return NextResponse.redirect(new URL('/login', req.url));  
            }
    } 
    return NextResponse.next();   
}  
