export interface Notifications {
    id: number;
    user_id: number;
    message: string;
    is_read: boolean;
    appointment_id: number;
}

export interface NotificationCreate {
    userId: number;
    message: string;
    appointmentId: number;
}
