"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';  
type UserType = {
    name: string;
}

interface UserContextType {  
    user: UserType | null;  
    setUser: React.Dispatch<React.SetStateAction<UserType | null>>;  
}  

// إنشاء السياق الافتراضي  
const UserContext = createContext<UserContextType | undefined>(undefined);  

// مزود المستخدم  
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {  
    const [user, setUser] = useState<UserType | null>(null);  

    return (  
        <UserContext.Provider value={{ user, setUser }}>  
            {children}  
        </UserContext.Provider>  
    );  
};  

// استخدام السياق  
export const useUser = (): UserContextType => {  
    const context = useContext(UserContext);  
    if (!context) {  
        throw new Error('useUser must be used within a UserProvider');  
    }  
    return context;  
};