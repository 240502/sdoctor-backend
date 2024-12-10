import { User } from './user';

export interface Doctor {
    doctor_id: number;
    clinic_id: number;
    major_id: number;
    summary: number;
    created_at: Date;
    updated_at: Date;
    title: string;
    price: number;
    views: number;
    introduction: string;
    user_id: number;
    service_name: string;
    service_id: number;
}

export interface DoctorInfo {
    doctor_id: number;
    user_id: number;
    clinic_id: number;
    major_id: number;
    summary: number;
    created_at: Date;
    updated_at: Date;
    title: string;
    price: number;
    views: number;
    introduction: string;
    full_name: string;
    image: string;
    phone: string;
    gender: string;
    address: string;
    email: string;
    birthday: Date;
    service_name: string;
    service_id: number;
}
