import { injectable } from 'tsyringe';
import { Database } from '../config/database';
import { Comment, CommentCreateDto } from '../models/comment';
@injectable()
export class CommentRepository {
    constructor(private db: Database) {}
    async createComment(comment: CommentCreateDto): Promise<any> {
        try {
            const sql = 'CALL CreateComment(?,?,?,?,?,?,@err_code,@err_msg)';
            const result = await this.db.query(sql, [
                comment.content,
                comment.fullName,
                comment.commentableId,
                comment.starCount,
                comment.dateBooking,
                comment.commentableType,
            ]);
            return result;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    async getCommentByCommentableIdAndType(
        pageSize: number,
        offset: number,
        commentableId: number,
        type: string,
    ): Promise<any> {
        try {
            const sql =
                'CALL GetCommentByCommentableIdAndType(?,?,?,?,@err_code,@err_msg)';
            const [results] = await this.db.query(sql, [
                pageSize,
                offset,
                commentableId,
                type,
            ]);

            if (Array.isArray(results) && results.length > 0) {
                return results;
            } else {
                return null;
            }
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
}
