import { injectable } from 'tsyringe';
import { PostRepository } from '../repositories/postRepository';
import { Post, PostCreateDto, PostUpdateDto } from '../models/post';

@injectable()
export class PostService {
    constructor(private postRepository: PostRepository) {}
    async createPost(post: PostCreateDto): Promise<any> {
        return this.postRepository.createPost(post);
    }
    async updatePost(post: PostUpdateDto): Promise<any> {
        try {
            if (!post.authorId || !post.id || !post.title) {
                throw new Error('Thiếu tham số để cập nhập bài viết !');
            }
            return this.postRepository.updatePost(post);
        } catch (err: any) {
            throw err;
        }
    }
    async deletePost(id: number): Promise<any> {
        return this.postRepository.deletePost(id);
    }
    async confirmPost(id: number): Promise<any> {
        return this.postRepository.confirmPost(id);
    }
    async getPostWithOptions(
        searchContent?: string,
        categoryId?: number | null,
        pageIndex?: number,
        pageSize?: number,
        status?: string,
        authorId?: number,
    ): Promise<any> {
        try {
            return this.postRepository.getPostWithOptions(
                searchContent?.length === 0 ? null : searchContent,
                typeof categoryId === 'string' && categoryId === 'null'
                    ? null
                    : categoryId,
                pageIndex ?? null,
                pageSize ?? null,
                status ?? null,
                authorId ?? null,
            );
        } catch (err: any) {
            throw err;
        }
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
        try {
            if (!id || !categoryId) {
                throw new Error('id and categoryId are required!');
            }
            const offSet: number = (pageIndex - 1) * pageSize;

            return this.postRepository.getRelatedPost(
                id,
                categoryId,
                !Number.isNaN(offSet) ? offSet : null,
                pageSize ?? null,
            );
        } catch (err: Error | any) {
            throw err;
        }
    }
}
