export interface PatientProfile {
    id: string;
    patientName: string;
    gender: string;
    patientPhone: string;
    patientEmail: string;
    birthday: Date;
    province: string;
    district: string;
    commune: string;
    createdAt: Date;
    updatedAt: Date;
    uuid: string;
}
