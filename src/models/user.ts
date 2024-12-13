import { Functions } from './functions';

export interface User {
    user_id: number;
    full_name: string;
    image: string;
    phone: string;
    gender: string;
    city: string;
    district: string;
    commune: string;

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
