import { createContext, useState,  type ReactNode } from 'react';
import type { User } from '../types/User';
import type { AuthContextData } from '../types/Auth';

export const AuthContext = createContext<AuthContextData | undefined>(undefined);

export function AuthProvider({children}: {children: ReactNode}){
    const [user, setUser] = useState<User | null>(null);
    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                isAuthenticated: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}