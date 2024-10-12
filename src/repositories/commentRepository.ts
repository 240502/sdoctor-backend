import { injectable } from 'tsyringe';
import { Database } from '../config/database';
import { Comment } from '../models/comment';
@injectable()
export class CommentRepository {
    constructor(private db: Database) {}
    async createCommentForUser(comment: Comment): Promise<any> {
        try {
            const sql = 'CALL CreateCommentForUser(?,?,?,?,@err_code,@err_msg)';
            await this.db.query(sql, [
                comment.content,
                comment.full_name,
                comment.user_id,
                comment.type,
            ]);
            return true;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
    async createCommentForPatient(comment: Comment): Promise<any> {
        try {
            const sql =
                'CALL CreateCommentForPatient(?,?,?,?,?,?,@err_code,@err_msg)';
            await this.db.query(sql, [
                comment.content,
                comment.full_name,
                comment.phone,
                comment.date_booking,
                comment.user_id,
                comment.type,
            ]);
            return true;
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
