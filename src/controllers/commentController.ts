import { injectable } from 'tsyringe';
import { CommentService } from '../services/comment.service';
import { Comment } from '../models/comment';
import { Request, Response } from 'express';
import { totalmem } from 'node:os';
import { getSocket } from '../socket';
import { DoctorService } from '../services/doctor.service';
import { NotificationService } from '../services/notificationService';
import { AppointmentService } from '../services/appointment.service';
@injectable()
export class CommentController {
    constructor(
        private commentService: CommentService,
        private doctorService: DoctorService,
        private notificationService: NotificationService,
        private appointmentService: AppointmentService,
    ) {}

    async createComment(req: Request, res: Response): Promise<void> {
        try {
            const { newComment, appointmentId } = req.body;
            const lastComment =
                await this.commentService.createComment(newComment);
            res.json({ message: 'successfully created ' });
            if (lastComment) {
                const io = getSocket();

                const newNotification: any = {
                    user_id: lastComment.user_id,
                    message: 'Có một bệnh nhân vừa nhận xét về dịch vụ!',
                    appointment_id: null,
                };
                const result =
                    await this.notificationService.createNotification(
                        newNotification,
                    );
                await this.doctorService.updateAvgDoctorStar(
                    lastComment.doctor_id,
                );
                await this.appointmentService.updateIsValuate(appointmentId);
                io.to(`doctor_${result.user_id}`).emit(
                    'newNotification',
                    result,
                );
            }
        } catch (err: any) {
            res.status(500).json({ message: err.message });
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
                res.status(200).json({
                    totalItems: Math.ceil(results[0].RecordCount),
                    pageIndex: pageIndex,
                    pageSize: pageSize,
                    commentableId: commentableId,
                    type: type,
                    comments: results,
                    pageCount: Math.ceil(results[0].RecordCount / pageSize),
                });
            } else {
                res.status(404).json({
                    message: 'Không tồn tại bình luận nào',
                    commentableId: commentableId,
                });
            }
        } catch (err: any) {
            res.json({ message: err.message });
        }
    }
}
