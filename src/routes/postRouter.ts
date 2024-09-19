import { Router } from 'express';
import { container } from 'tsyringe';
import { PostController } from '../controllers/postController';
import { authenticate } from '../middlewares/authMiddleware';
const postRouter = Router();
const postController = container.resolve(PostController);

postRouter.post(
    '/create',
    authenticate,
    postController.createPost.bind(postController),
);

postRouter.put(
    '/update',
    authenticate,
    postController.updatePost.bind(postController),
);
postRouter.delete(
    '/delete/:id',
    authenticate,
    postController.deletePost.bind(postController),
);

postRouter.put(
    '/confirm/:id',
    authenticate,
    postController.confirmPost.bind(postController),
);
postRouter.post('/view', postController.viewPost.bind(postController));
export default postRouter;
