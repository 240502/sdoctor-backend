import { ServiceScheduleDetail } from './service_schedule_detail';

export interface ServiceSchedule {
    id: number;
    date: Date;
    service_id: number;
    created_at: Date;
    updated_at: Date;
    listScheduleDetails: ServiceScheduleDetail[];
}
