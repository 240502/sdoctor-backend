import { injectable } from 'tsyringe';
import { PostRepository } from '../repositories/postRepository';
import { Post } from '../models/post';

@injectable()
export class PostService {
    constructor(private postRepository: PostRepository) {}
    async createPost(post: Post): Promise<any> {
        return this.postRepository.createPost(post);
    }
    async updatePost(post: Post): Promise<any> {
        return this.postRepository.updatePost(post);
    }
    async deletePost(id: number): Promise<any> {
        return this.postRepository.deletePost(id);
    }
    async confirmPost(id: number): Promise<any> {
        return this.postRepository.confirmPost(id);
    }
    async viewPost(
        categoryId: number,
        pageIndex: number,
        pageSize: number,
    ): Promise<any> {
        return this.postRepository.viewPost(categoryId, pageIndex, pageSize);
    }
    async getCommonPost(): Promise<any> {
        return this.postRepository.getCommonPost();
    }
    async updateViewsPost(id: number): Promise<any> {
        return this.postRepository.updateViewsPost(id);
    }
    async viewPostAdmin(
        pageIndex: number,
        pageSize: number,
        categoryId: number | null,
        status: string,
    ): Promise<any> {
        return this.postRepository.viewPostAdmin(
            pageIndex,
            pageSize,
            categoryId,
            status,
        );
    }
}
