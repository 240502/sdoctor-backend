import { injectable } from 'tsyringe';
import { CommentService } from '../services/commentService';
import { Comment } from '../models/comment';
import { Request, Response } from 'express';
import { totalmem } from 'node:os';
import { getSocket } from '../socket';
@injectable()
export class CommentController {
    constructor(private commentService: CommentService) {}

    async createCommentForUser(req: Request, res: Response): Promise<void> {
        try {
            const comment: Comment = req.body as Comment;
            await this.commentService.createCommentForUser(comment);
            res.json({ message: 'successfully created ' });
        } catch (err: any) {
            res.json({ message: err.message });
        }
    }

    async createCommentForPatient(req: Request, res: Response): Promise<void> {
        try {
            const comment: Comment = req.body as Comment;
            await this.commentService.createCommentForPatient(comment);
            const io = getSocket();
            io.emit('newComment', comment);
            res.json({ message: 'successfully created ' });
        } catch (err: any) {
            res.json({ message: err.message });
        }
    }
    async getCommentByUserId(req: Request, res: Response): Promise<any> {
        try {
            const { pageIndex, pageSize, userId } = req.body;
            const results = await this.commentService.getCommentByUserId(
                pageIndex,
                pageSize,
                userId,
            );
            if (results.length > 0) {
                res.status(200).json({
                    totalItems: Math.ceil(results[0].RecordCount),
                    pageIndex: pageIndex,
                    pageSize: pageSize,
                    userId: userId,
                    data: results,
                    pageCount: Math.ceil(results[0].RecordCount / pageSize),
                });
            } else {
                res.status(404).json({
                    message: 'Không tồn tại bình luận nào',
                    userId: userId,
                });
            }
        } catch (err: any) {
            res.json({ message: err.message });
        }
    }
}
