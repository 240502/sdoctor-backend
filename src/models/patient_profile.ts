export interface PatientProfile {
    id: number;
    patient_name: string;
    gender: string;
    patient_phone: string;
    patient_email: string;
    birthday: Date;
    province: string;
    district: string;
    commune: string;
    created_at: Date;
    updated_at: Date;
    uuid: string;
}
