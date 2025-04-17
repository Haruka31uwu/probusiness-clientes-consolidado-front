// types/auth.types.ts
export interface User {
    id: number;
    name: string;
    email: string;
    
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
    user: User;
}