import { injectable } from 'tsyringe';
import { PostService } from '../services/postService';
import { Post } from '../models/post';
import { Request, Response } from 'express';

@injectable()
export class PostController {
    constructor(private postService: PostService) {}
    async createPost(req: Request, res: Response): Promise<void> {
        try {
            const post: Post = req.body as Post;
            this.postService.createPost(post);
            res.json({ message: 'Success', result: true });
        } catch (err: any) {
            res.json({ message: err.message });
        }
    }
    async updatePost(req: Request, res: Response): Promise<void> {
        try {
            const post: Post = req.body as Post;
            this.postService.updatePost(post);
            res.json({ message: 'Success', result: true });
        } catch (err: any) {
            res.json({ message: err.message });
        }
    }
    async deletePost(req: Request, res: Response): Promise<void> {
        try {
            const id: number = Number(req.params.id);
            this.postService.deletePost(id);
            res.json({ message: 'Success', result: true });
        } catch (err: any) {
            res.json({ message: err.message });
        }
    }
    async confirmPost(req: Request, res: Response): Promise<void> {
        try {
            const id: number = Number(req.params.id);
            this.postService.confirmPost(id);
            res.json({ message: 'Success', result: true });
        } catch (err: any) {
            res.json({ message: err.message });
        }
    }
    async viewPost(req: Request, res: Response): Promise<void> {
        try {
            const { categoryId, pageIndex, pageSize } = req.body;
            const data = await this.postService.viewPost(
                categoryId,
                pageIndex,
                pageSize,
            );
            if (data) {
                res.json({
                    totalItems: data[0].RecordCount,
                    page: pageIndex,
                    pageSize: pageSize,
                    data: data,
                    pageCount: Math.ceil(data[0].RecordCount / pageSize),
                    categoryId: categoryId,
                });
            } else {
                res.status(404).json({ message: 'Không có bản ghi nào!' });
            }
        } catch (err: any) {
            res.json({ message: err.message });
        }
    }
}
