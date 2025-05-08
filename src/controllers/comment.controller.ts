import { injectable } from 'tsyringe';
import { CommentService } from '../services/comment.service';
import { Comment, CommentCreateDto } from '../models/comment';
import { Request, Response } from 'express';
import { totalmem } from 'node:os';
import { getSocket } from '../socket';
import { DoctorService } from '../services/doctor.service';
import { NotificationService } from '../services/notification.service';
import { AppointmentService } from '../services/appointment.service';
import { NotificationCreate } from '../models/notifications';
@injectable()
export class CommentController {
    constructor(
        private commentService: CommentService,
        private notificationService: NotificationService,
        private appointmentService: AppointmentService,
    ) {}

    async createComment(req: Request, res: Response): Promise<void> {
        try {
            const { newComment, appointmentId } = req.body as {
                newComment: CommentCreateDto;
                appointmentId: number;
            };

            // Tạo bình luận
            await this.commentService.createComment(newComment);

            // Tạo thông báo
            const io = getSocket();
            const newNotification: NotificationCreate = {
                userId: newComment.commentableId,
                message: 'Có một bệnh nhân vừa nhận xét về dịch vụ!',
                appointmentId: null,
            };
            const result =
                await this.notificationService.createNotification(
                    newNotification,
                );

            // Cập nhật trạng thái cuộc hẹn
            await this.appointmentService.updateIsValuate(appointmentId);

            // Gửi sự kiện socket
            io.to(`doctor_${newComment.commentableId}`).emit(
                'newNotification',
                result,
            );
            console.log(`view_doctor_${newComment.commentableId}`);

            io.to(`view_doctor_${newComment.commentableId}`).emit(
                'newComment',
                {},
            );

            res.status(201).json({
                message: 'successfully created',
                result: true,
            });
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    }
    async getCommentByCommentableIdAndType(
        req: Request,
        res: Response,
    ): Promise<any> {
        try {
            const { pageIndex, pageSize, commentableId, type } = req.body;
            const results =
                await this.commentService.getCommentByCommentableIdAndType(
                    pageIndex,
                    pageSize,
                    commentableId,
                    type,
                );
            if (results) {
                return res.status(200).json({
                    totalItems: Math.ceil(results[0].RecordCount),
                    pageIndex: pageIndex,
                    pageSize: pageSize,
                    commentableId: commentableId,
                    type: type,
                    comments: results,
                    pageCount: Math.ceil(results[0].RecordCount / pageSize),
                });
            } else {
                return res.status(404).json({
                    message: 'Không tồn tại bình luận nào',
                    commentableId: commentableId,
                });
            }
        } catch (err: any) {
            res.json({ message: err.message });
        }
    }
}
