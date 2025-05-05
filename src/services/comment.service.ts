import { injectable } from 'tsyringe';
import { CommentRepository } from '../repositories/commentRepository';
import { Comment } from '../models/comment';

@injectable()
export class CommentService {
    constructor(private commentRepository: CommentRepository) {}
    async createComment(comment: Comment): Promise<any> {
        return this.commentRepository.createComment(comment);
    }

    async getCommentByCommentableIdAndType(
        pageIndex: number,
        pageSize: number,
        commentableId: number,
        type: string,
    ): Promise<any> {
        try {
            const offset = (pageIndex - 1) * pageSize;
            return this.commentRepository.getCommentByCommentableIdAndType(
                pageSize,
                offset,
                commentableId,
                type,
            );
        } catch (err: any) {
            throw err;
        }
    }
}
