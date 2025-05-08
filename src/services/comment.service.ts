import { injectable } from 'tsyringe';
import { CommentRepository } from '../repositories/commentRepository';
import { Comment, CommentCreateDto } from '../models/comment';

@injectable()
export class CommentService {
    constructor(private commentRepository: CommentRepository) {}
    async createComment(comment: CommentCreateDto): Promise<any> {
        try {
            if (
                !comment.commentableId ||
                !comment.starCount ||
                !comment.fullName
            ) {
                throw new Error('Thiếu tham số để thêm dữ liệu !');
            }
            return this.commentRepository.createComment(comment);
        } catch (err: any) {
            throw err;
        }
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
