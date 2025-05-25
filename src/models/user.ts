import { Functions } from './functions';

export interface User {
    userId: number;
    fullName: string;
    image: string;
    phone: string;
    gender: string;
    city: string;
    district: string;
    commune: string;

    email: string;
    birthday: Date;
    password: string;
    roleId: number;
    created_at: Date;
    updated_at: Date;
    token: string;
    functions: Functions[];
    active: number;
    roleName: string;
}

export interface TokenPayload {
    id: number;
    username?: string;
}

export interface LoginResponse {
    user: User;
    accessToken: string;
    refreshToken: string;
}
