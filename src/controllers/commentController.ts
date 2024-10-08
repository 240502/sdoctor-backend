import { injectable } from 'tsyringe';
import { CommentService } from '../services/commentService';
import { Comment } from '../models/comment';
import { Request, Response } from 'express';
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
            res.json({ message: 'successfully created ' });
        } catch (err: any) {
            res.json({ message: err.message });
        }
    }
}
