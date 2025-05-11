import { Router } from 'express';
import { container } from 'tsyringe';
import { CommentController } from '../controllers/comment.controller';

const commentRouter = Router();
const commentController = container.resolve(CommentController);

/**
 * @swagger
 * tags:
 *   - name: Comment
 */

/**
 * @swagger
 * /comment/create:
 *   post:
 *     tags: [Comment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *               commentableId:
 *                 type: string
 *               commentableType:
 *                 type: string
 *             required:
 *               - content
 *               - commentableId
 *               - commentableType
 *     responses:
 *       201:
 *         description: Tạo bình luận thành công
 */
commentRouter.post(
    '/create',
    commentController.createComment.bind(commentController),
);

/**
 * @swagger
 * /comment/get-comment-by-commentable-id:
 *   post:
 *     tags: [Comment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               commentableId:
 *                 type: string
 *               commentableType:
 *                 type: string
 *             required:
 *               - commentableId
 *               - commentableType
 *     responses:
 *       200:
 *         description: Danh sách bình luận
 */
commentRouter.post(
    '/get-comment-by-commentable-id',
    commentController.getCommentByCommentableIdAndType.bind(commentController),
);

export default commentRouter;
