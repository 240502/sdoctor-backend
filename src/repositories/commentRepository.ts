import { injectable } from 'tsyringe';
import { Database } from '../config/database';
import { Comment } from '../models/comment';
@injectable()
export class CommentRepository {
    constructor(private db: Database) {}
    async createCommentForUser(comment: Comment): Promise<any> {
        try {
            const sql = 'CALL CreateCommentForUser(?,?,?,@err_code,@err_msg)';
            await this.db.query(sql, [
                comment.content,
                comment.full_name,
                comment.user_id,
            ]);
            return true;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
    async createCommentForPatient(comment: Comment): Promise<any> {
        try {
            const sql =
                'CALL CreateCommentForPatient(?,?,?,?,@err_code,@err_msg)';
            await this.db.query(sql, [
                comment.content,
                comment.full_name,
                comment.phone,
                comment.date_booking,
            ]);
            return true;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
}
