import { injectable } from 'tsyringe';
import { Database } from '../config/database';
import { Comment } from '../models/comment';
@injectable()
export class CommentRepository {
    constructor(private db: Database) {}
    async createComment(comment: Comment): Promise<any> {
        try {
            const sql = 'CALL CreateComment(?,?,?,?,@err_code,@err_msg)';
            const [results] = await this.db.query(sql, [
                comment.content,
                comment.full_name,
                comment.doctor_id,
                comment.star,
            ]);
            if (Array.isArray(results) && results.length > 0) {
                return results[0];
            } else {
                return null;
            }
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    async getCommentByUserId(
        pageIndex: number,
        pageSize: number,
        userId: number,
        type: string,
    ): Promise<any> {
        try {
            const sql = 'CALL GetCommentByUserId(?,?,?,?,@err_code,@err_msg)';
            const [results] = await this.db.query(sql, [
                pageIndex,
                pageSize,
                userId,
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
