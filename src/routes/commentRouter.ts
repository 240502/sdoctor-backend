import { Router } from 'express';
import { container } from 'tsyringe';
import { CommentController } from '../controllers/commentController';
import { authenticate } from '../middlewares/authMiddleware';
const commentRouter = Router();
const commentController = container.resolve(CommentController);

commentRouter.post(
    '/create',
    commentController.createComment.bind(commentController),
);

commentRouter.post(
    '/get-by-user-id',
    commentController.getCommentByUserId.bind(commentController),
);

export default commentRouter;
