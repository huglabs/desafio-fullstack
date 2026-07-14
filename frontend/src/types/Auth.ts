import type { User } from './User';

export interface AuthResponse {
    user: User;
    token: string;
}

export interface RegisterPayload {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface AuthContextData {
    user: User | null;
    isAuthenticated: boolean;
    setUser: (user: User | null) => void;
}