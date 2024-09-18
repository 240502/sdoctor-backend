import { injectable } from 'tsyringe';
import { Database } from '../config/database';
import { Comment } from '../models/comment';
@injectable()
export class CommentRepository {
    constructor(private db: Database) {}
    async createComment(comment: Comment): Promise<any> {
        try {
            const sql = 'CALL CreateComment(?,?,?,@err_code,@err_msg)';
            await this.db.query(sql, [
                comment.content,
                comment.date_booking,
                comment.user_id,
            ]);
            return true;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
}
