import { createContext, useState, type ReactNode } from 'react';
import type { User } from '../types/User';
import type { AuthContextData } from '../types/Auth';

export const AuthContext = createContext<AuthContextData | undefined>(undefined);

function getStoredUser(): User | null {
    const stored = localStorage.getItem('user');
    if (!stored) return null;
    try {
        return JSON.parse(stored);
    } catch {
        return null;
    }
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(getStoredUser);
    

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