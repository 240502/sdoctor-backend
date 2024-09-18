import { Router } from 'express';
import { container } from 'tsyringe';
import { CommentController } from '../controllers/commentController';
import { authenticate } from '../middlewares/authMiddleware';
const commentRouter = Router();
const commentController = container.resolve(CommentController);

commentRouter.post(
    '/create',
    authenticate,
    commentController.createComment.bind(commentController),
);

export default commentRouter;
