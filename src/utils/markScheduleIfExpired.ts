import dayjs from 'dayjs';
import { Schedules } from '../models';
export function markScheduleIfExpired(schedules: Schedules[]): {
    schedules: Schedules[];
    updatedScheduleIds: number[];
} {
    const now = dayjs();
    const updatedScheduleIds: number[] = [];
    let newSchedules: Schedules[] = schedules.map(
        (schedule: Schedules): Schedules => {
            const [startHour, startMinute] = schedule.startTime
                .split(':')
                .map(Number);
            const startTime = dayjs()
                .hour(startHour)
                .minute(startMinute)
                .second(0);
            const diffMinutes = now.diff(startTime, 'minute');
            if (diffMinutes > -20) {
                updatedScheduleIds.push(schedule.id);
                return { ...schedule, status: 'expired' };
            } else {
                return schedule;
            }
        },
    );

    return {
        schedules: newSchedules ?? [],
        updatedScheduleIds: updatedScheduleIds,
    };
}
