import { injectable } from 'tsyringe';
import { PostCategoryRepository } from '../repositories/post_categoryRepository';
import { PostCategory } from '../models/post_category';

@injectable()
export class PostCategoryService {
    constructor(private postCategoryRepository: PostCategoryRepository) {}
    async getAllPostCategories(): Promise<any> {
        return this.postCategoryRepository.getAllPostCategories();
    }
}
