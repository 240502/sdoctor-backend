import { injectable } from 'tsyringe';
import { Database } from '../config/database';
import { Post, PostCreateDto, PostUpdateDto } from '../models/post';
@injectable()
export class PostRepository {
    constructor(private db: Database) {}
    async createPost(post: PostCreateDto): Promise<any> {
        try {
            const sql = 'CALL CreatePost(?,?,?,?,?,@err_code,@err_msg)';

            await this.db.query(sql, [
                post.title,
                post.content,
                post.authorId,
                post.categoryId,
                post.featuredImage,
            ]);
            return true;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
    async updatePost(post: PostUpdateDto): Promise<any> {
        try {
            const sql = 'CALL UpdatePost(?,?,?,?,?,@err_code,@err_msg)';
            await this.db.query(sql, [
                post.id,
                post.title,
                post.content,
                post.authorId,
                post.categoryId,
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
    async getPostWithOptions(
        searchContent?: string | null,
        categoryId?: number | null,
        pageIndex?: number | null,
        pageSize?: number | null,
        status?: string | null,
        authorId?: number | null,
        position?: string | null,
    ): Promise<any> {
        try {
            const sql = 'CALL ViewPost(?,?,?,?,?,?,@err_code,@err_msg)';
            const [results] = await this.db.query(sql, [
                searchContent,
                categoryId,
                pageIndex,
                pageSize,
                status,
                position === 'admin' ? null : authorId,
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
    async getNewPosts(): Promise<any> {
        try {
            const sql = 'CALL GetNewPosts(@err_code,@err_msg)';
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
    async viewPostDoctor(
        pageIndex: number,
        pageSize: number,
        categoryId: number | null,
        status: string,
        authorId: number,
        title: string,
    ): Promise<any> {
        try {
            const sql = 'CALL ViewNewsAdmin(?,?,?,?,?,?,@err_code,@err_msg)';
            const [results] = await this.db.query(sql, [
                pageIndex,
                pageSize,
                categoryId,
                status,
                authorId,
                title,
            ]);

            if (Array.isArray(results) && results.length > 0) {
                return results;
            } else return null;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
    async getPostById(id: number): Promise<any> {
        try {
            const sql = 'CALL GetPostById(?,@err_code,@err_msg)';
            const [results] = await this.db.query(sql, [id]);
            if (Array.isArray(results) && results.length > 0) {
                return results[0];
            } else {
                return null;
            }
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
    async getRelatedPost(
        id: number,
        categoryId: number,
        offSet: number | null,
        pageSize: number,
    ): Promise<any> {
        try {
            const sql = 'CALL GetRelatedPost(?,?,?,?,@err_code,@err_msg)';
            const [results] = await this.db.query(sql, [
                id,
                categoryId,
                offSet,
                pageSize,
            ]);
            if (Array.isArray(results) && results.length > 0) {
                return results;
            } else {
                return null;
            }
        } catch (err: any) {
            console.log(err);
            throw new Error(err.message);
        }
    }
}
