import { Router } from 'express';
import { container } from 'tsyringe';
import { CommentController } from '../controllers/commentController';
import { authenticate } from '../middlewares/authMiddleware';
const commentRouter = Router();
const commentController = container.resolve(CommentController);

commentRouter.post(
    '/create-for-user',
    authenticate,
    commentController.createCommentForUser.bind(commentController),
);

commentRouter.post(
    '/create-for-patient',
    commentController.createCommentForPatient.bind(commentController),
);

export default commentRouter;
