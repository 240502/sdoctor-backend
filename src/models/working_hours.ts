export interface WorkingHours {
    id: number;
    clinicId: number;
    dayOfWeek: string;
    startTime: string;
    endTime: string;
}
export interface WorkingHoursCreateDto {
    clinicId: number;
    dayOfWeek: string;
    startTime: string;
    endTime: string;
}
