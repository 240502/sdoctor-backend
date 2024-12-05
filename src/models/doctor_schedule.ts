import { DoctorScheduleDetail } from './doctor_schedule_detail';

export interface DoctorSchedule {
    id: number;
    doctor_id: number;
    date: Date;
    created_at: Date;
    updated_at: Date;
    type: string;
    listScheduleDetails: DoctorScheduleDetail[];
}
