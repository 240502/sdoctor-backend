export interface Appointment {
    id: Number;
    doctor_id: Number;
    appointment_date: Date;
    patient_name: String;
    patient_phone: String;
    patient_email: String;
    birthday: Date;
    province: String;
    district: String;
    commune: String;
    examination_reason: String;
    time_id: Number;
    status_id: Number;
    created_at: Date;
    updated_at: Date;
    doctor_name: string;
    time_value: string;
    price: number;
    type: string;
    gender: number;
    location: string;
}

export interface AppointmentViewPatient extends Appointment {
    status_name: string;
}
