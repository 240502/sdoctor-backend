import { container } from 'tsyringe';
import { Router } from 'express';
import { PostCategoryController } from '../controllers/post_category.controller';

/**
 * @swagger
 * tags:
 *   name: PostCategory
 */

const postCategoryRouter = Router();
const postCategoryController = container.resolve(PostCategoryController);

/**
 * @swagger
 * /post-category/get-all-post-category:
 *   get:
 *     tags: [PostCategory]
 *     responses:
 *       200:
 *         description: Successfully fetched post categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *       500:
 *         description: Internal server error
 */
postCategoryRouter.get(
    '/get-all-post-category',
    postCategoryController.getAllPostCategories.bind(postCategoryController),
);

export default postCategoryRouter;
