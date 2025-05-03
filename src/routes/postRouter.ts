import { Router } from 'express';
import { container } from 'tsyringe';
import { PostController } from '../controllers/post.controller';
import { authenticate } from '../middlewares/authMiddleware';
const postRouter = Router();
const postController = container.resolve(PostController);

postRouter.post(
    '/create',
    authenticate,
    postController.createPost.bind(postController),
);

postRouter.post(
    '/view-news-doctor',
    authenticate,
    postController.viewPostDoctor.bind(postController),
);

postRouter.get(
    '/get-post-with-options',
    postController.getPostWithOptions.bind(postController),
);

postRouter.post(
    '/get-related-post',
    postController.getRelatedPost.bind(postController),
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

postRouter.put('/confirm/:id', postController.confirmPost.bind(postController));

postRouter.get(
    '/get-common-post',
    postController.getCommonPost.bind(postController),
);
postRouter.get(
    '/get-by-id/:id',
    postController.getPostById.bind(postController),
);
postRouter.get(
    '/get-new-posts',
    postController.getNewPost.bind(postController),
);
postRouter.put(
    '/update-views-post/:id',
    postController.updateViewsPost.bind(postController),
);
export default postRouter;
