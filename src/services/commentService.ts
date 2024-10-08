import { injectable } from 'tsyringe';
import { CommentRepository } from '../repositories/commentRepository';
import { Comment } from '../models/comment';

@injectable()
export class CommentService {
    constructor(private commentRepository: CommentRepository) {}
    async createCommentForUser(comment: Comment): Promise<any> {
        return this.commentRepository.createCommentForUser(comment);
    }
    async createCommentForPatient(comment: Comment): Promise<any> {
        return this.commentRepository.createCommentForPatient(comment);
    }
}
