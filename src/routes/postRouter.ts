import { Router } from 'express';
import { container } from 'tsyringe';
import { PostController } from '../controllers/post.controller';
import { authenticate } from '../middlewares/authMiddleware';

/**
 * @swagger
 * tags:
 *   name: Post
 */

const postRouter = Router();
const postController = container.resolve(PostController);

/**
 * @swagger
 * /post/create:
 *   post:
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               authorId:
 *                 type: string
 *               categoryId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Post created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
postRouter.post(
    '/create',
    authenticate,
    postController.createPost.bind(postController),
);

/**
 * @swagger
 * /post/view-news-doctor:
 *   post:
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched doctor news
 *       500:
 *         description: Internal server error
 */
postRouter.post(
    '/view-news-doctor',
    authenticate,
    postController.viewPostDoctor.bind(postController),
);

/**
 * @swagger
 * /post/get-post-with-options:
 *   get:
 *     tags: [Post]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of posts to retrieve
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         description: Number of posts to skip
 *     responses:
 *       200:
 *         description: Successfully fetched posts
 *       500:
 *         description: Internal server error
 */
postRouter.get(
    '/get-post-with-options',
    postController.getPostWithOptions.bind(postController),
);

/**
 * @swagger
 * /post/get-related-post:
 *   post:
 *     tags: [Post]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               postId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully fetched related posts
 *       500:
 *         description: Internal server error
 */
postRouter.post(
    '/get-related-post',
    postController.getRelatedPost.bind(postController),
);

/**
 * @swagger
 * /post/update:
 *   put:
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               categoryId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post updated successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
postRouter.put(
    '/update',
    authenticate,
    postController.updatePost.bind(postController),
);

/**
 * @swagger
 * /post/delete/{id}:
 *   delete:
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID to delete
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal server error
 */
postRouter.delete(
    '/delete/:id',
    authenticate,
    postController.deletePost.bind(postController),
);

/**
 * @swagger
 * /post/confirm/{id}:
 *   put:
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID to confirm
 *     responses:
 *       200:
 *         description: Post confirmed successfully
 *       404:
 *         description: Post not found
 */
postRouter.put('/confirm/:id', postController.confirmPost.bind(postController));

/**
 * @swagger
 * /post/get-common-post:
 *   get:
 *     tags: [Post]
 *     responses:
 *       200:
 *         description: Successfully fetched common posts
 *       500:
 *         description: Internal server error
 */
postRouter.get(
    '/get-common-post',
    postController.getCommonPost.bind(postController),
);

/**
 * @swagger
 * /post/get-by-id/{id}:
 *   get:
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID to retrieve
 *     responses:
 *       200:
 *         description: Successfully fetched post
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal server error
 */
postRouter.get(
    '/get-by-id/:id',
    postController.getPostById.bind(postController),
);

/**
 * @swagger
 * /post/get-new-posts:
 *   get:
 *     tags: [Post]
 *     responses:
 *       200:
 *         description: Successfully fetched new posts
 *       500:
 *         description: Internal server error
 */
postRouter.get(
    '/get-new-posts',
    postController.getNewPost.bind(postController),
);

/**
 * @swagger
 * /post/update-views-post/{id}:
 *   put:
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID to update views
 *     responses:
 *       200:
 *         description: Post views updated successfully
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal server error
 */
postRouter.put(
    '/update-views-post/:id',
    postController.updateViewsPost.bind(postController),
);

export default postRouter;
