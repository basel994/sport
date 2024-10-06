import { UserType } from "@/types/users/usersType";
import { jwtDecode } from "jwt-decode";

export function tokenDecode(token: string): UserType {   
        const decoded = jwtDecode(token) as UserType;  
        return decoded;  
} 