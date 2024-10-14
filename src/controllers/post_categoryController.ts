import { injectable } from 'tsyringe';
import { PostCategoryService } from '../services/post_categoryService';
import { PostCategory } from '../models/post_category';
import { Request, Response } from 'express';

@injectable()
export class PostCategoryController {
    constructor(private postCategoryService: PostCategoryService) {}
    async getAllPostCategories(req: Request, res: Response): Promise<void> {
        try {
            const result =
                await this.postCategoryService.getAllPostCategories();
            if (result) {
                res.json(result);
            } else {
                res.status(404).json({ message: 'Không tồn tại bản ghi nào' });
            }
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }
}
