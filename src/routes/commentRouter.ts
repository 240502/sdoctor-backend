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

commentRouter.post(
    '/get-by-user-id',
    commentController.getCommentByUserId.bind(commentController),
);

export default commentRouter;
