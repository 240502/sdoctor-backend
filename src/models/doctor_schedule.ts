export interface DoctorSchedule {
    id: number;
    entityId: number;
    date: Date;
    timeId: number;
    created_at: Date;
    updated_at: Date;
    entityType: string;
    status: string;
}
