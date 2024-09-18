import { injectable } from 'tsyringe';
import { CommentRepository } from '../repositories/commentRepository';
import { Comment } from '../models/comment';

@injectable()
export class CommentService {
    constructor(private commentRepository: CommentRepository) {}
    async createComment(comment: Comment): Promise<any> {
        return this.commentRepository.createComment(comment);
    }
    
}
