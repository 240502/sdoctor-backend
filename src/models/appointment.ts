export interface AppointmentCreateDto {
    doctor_id: number;
    appointment_date: Date;
    patient_name: string;
    patient_phone: string;
    patient_email: string;
    birthday: Date;
    province: string;
    district: string;
    commune: string;
    examination_reason: string;
    time_id: string;
    status_id: string;
    created_at: Date;
    updated_at: Date;
    doctor_name: string;
    time_value: string;
    price: number;
    gender: number;
    location: string;
    rejectionReason: string;
    service_id: number;
    service_name: string;
}
export interface AppointmentFilterDto {
    pageIndex: number;
    pageSize: number;
    phone: string;
    statusId: number;
    doctorId: number;
    type: number;
}
export interface AppointmentRes {
    recordCount: number;
    id: number;
    doctor_id: number;
    appointment_date: Date;
    patient_name: string;
    patient_phone: string;
    patient_email: string;
    birthday: Date;
    province: string;
    district: string;
    commune: string;
    examination_reason: string;
    time_id: string;
    status_id: string;
    created_at: Date;
    updated_at: Date;
    doctor_name: string;
    time_value: string;
    price: number;
    gender: number;
    location: string;
    rejectionReason: string;
    service_id: number;
    service_name: string;
}
