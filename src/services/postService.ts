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
}
