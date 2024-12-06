import { Functions } from './functions';

export interface User {
    id: number;
    full_name: string;
    image: string;
    phone: string;
    gender: string;
    address: string;
    email: string;
    birthday: Date;
    password: string;
    role_id: number;
    created_at: Date;
    updated_at: Date;
    token: string;
    functions: Functions[];
    doctor_id: number;
    active: number;
}
