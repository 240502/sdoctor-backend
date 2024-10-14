import { injectable } from 'tsyringe';
import { Database } from '../config/database';
import { Post } from '../models/post';
@injectable()
export class PostRepository {
    constructor(private db: Database) {}
    async createPost(post: Post): Promise<any> {
        try {
            const sql = 'CALL CreatePost(?,?,?,?,?,@err_code,@err_msg)';
            await this.db.query(sql, [
                post.title,
                post.content,
                post.author_id,
                post.status,
                post.category_id,
            ]);
            return true;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
    async updatePost(post: Post): Promise<any> {
        try {
            const sql = 'CALL UpdatePost(?,?,?,?,?,?,?,@err_code,@err_msg)';
            await this.db.query(sql, [
                post.id,
                post.title,
                post.content,
                post.author_id,
                post.status,
                post.category_id,
                post.public_date,
            ]);
            return true;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
    async deletePost(id: number): Promise<any> {
        try {
            const sql = 'CALL DeletePost(?,@err_code,@err_msg)';
            await this.db.query(sql, [id]);
            return true;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
    async confirmPost(id: number): Promise<any> {
        try {
            const sql = 'CALL ConfirmPost(?,@err_code,@err_msg)';
            await this.db.query(sql, [id]);
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
    async viewPost(
        categoryId: number,
        pageIndex: number,
        pageSize: number,
    ): Promise<any> {
        try {
            const sql = 'CALL ViewPost(?,?,?,@err_code,@err_msg)';
            const [results] = await this.db.query(sql, [
                categoryId,
                pageIndex,
                pageSize,
            ]);
            if (Array.isArray(results) && results.length > 0) {
                return results;
            } else return null;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
    async getCommonPost(): Promise<any> {
        try {
            const sql = 'CALL GetCommonPost(@err_code,@err_msg)';
            const [results] = await this.db.query(sql, []);
            if (Array.isArray(results) && results.length > 0) {
                return results;
            } else return null;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
    async updateViewsPost(id: number): Promise<any> {
        try {
            const sql = 'CALL UpdateViewsPost(?,@err_code,@err_msg)';
            await this.db.query(sql, [id]);
            return true;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
    
}
