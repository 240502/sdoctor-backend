export interface Comment {
    id: Number;
    content: Number;
    date_booking: Date;
    doctor_id: number;
    star: number;
    phone: string;
    full_name: string;
    type: string;
    user_id: number;
}

export interface CommentCreateDto {
    content: string;
    fullName: string;
    commentableId: number;
    starCount: number;
    dateBooking: Date;
    commentableType: string;
}
