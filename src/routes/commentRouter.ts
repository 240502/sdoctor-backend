import { Router } from 'express';
import { container } from 'tsyringe';
import { CommentController } from '../controllers/commentController';
const commentRouter = Router();
const commentController = container.resolve(CommentController);

commentRouter.post(
    '/create',
    commentController.createComment.bind(commentController),
);

commentRouter.post(
    '/get-comment-by-doctor-id',
    commentController.getCommentByDoctorId.bind(commentController),
);

export default commentRouter;
