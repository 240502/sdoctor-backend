import { container } from 'tsyringe';
import { Router } from 'express';
import { PostCategoryController } from '../controllers/post_categoryController';

const postCategoryRouter = Router();
const postCategoryController = container.resolve(PostCategoryController);

postCategoryRouter.get(
    '/get-all-post-category',
    postCategoryController.getAllPostCategories.bind(postCategoryController),
);

export default postCategoryRouter;
