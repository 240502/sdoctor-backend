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
    async viewPostForClient(
        searchContent: string,
        categoryId: number,
        pageIndex: number,
        pageSize: number,
    ): Promise<any> {
        return this.postRepository.viewPostForClient(
            searchContent,
            categoryId,
            pageIndex,
            pageSize,
        );
    }
    async getCommonPost(): Promise<any> {
        return this.postRepository.getCommonPost();
    }
    async getNewPost(): Promise<any> {
        return this.postRepository.getNewPosts();
    }
    async updateViewsPost(id: number): Promise<any> {
        return this.postRepository.updateViewsPost(id);
    }
    async viewPostDoctor(
        pageIndex: number,
        pageSize: number,
        categoryId: number | null,
        status: string,
        authorId: number,
        title: string,
    ): Promise<any> {
        return this.postRepository.viewPostDoctor(
            pageIndex,
            pageSize,
            categoryId,
            status,
            authorId,
            title,
        );
    }
    async getPostById(id: number): Promise<any> {
        return this.postRepository.getPostById(id);
    }
    async getRelatedPost(
        id: number,
        categoryId: number,
        pageIndex: number,
        pageSize: number,
    ): Promise<any> {
        return this.postRepository.getRelatedPost(
            id,
            categoryId,
            pageIndex,
            pageSize,
        );
    }
}
