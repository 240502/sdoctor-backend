import { injectable } from 'tsyringe';
import { CommentService } from '../services/commentService';
import { Comment } from '../models/comment';
import { Request, Response } from 'express';
import { totalmem } from 'node:os';
import { getSocket } from '../socket';
@injectable()
export class CommentController {
    constructor(private commentService: CommentService) {}

    async createComment(req: Request, res: Response): Promise<void> {
        try {
            const comment: Comment = req.body as Comment;
            await this.commentService.createComment(comment);
            res.json({ message: 'successfully created ' });
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }
    async getCommentByUserId(req: Request, res: Response): Promise<any> {
        try {
            const { pageIndex, pageSize, userId, type } = req.body;
            const results = await this.commentService.getCommentByUserId(
                pageIndex,
                pageSize,
                userId,
                type,
            );
            if (results.length > 0) {
                res.status(200).json({
                    totalItems: Math.ceil(results[0].RecordCount),
                    pageIndex: pageIndex,
                    pageSize: pageSize,
                    userId: userId,
                    data: results,
                    type: type,
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
