import { jwtDecode } from "jwt-decode";

export function tokenDecode(token: string) {   
        const decoded = jwtDecode(token);  
        return decoded;  
} 