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
}
