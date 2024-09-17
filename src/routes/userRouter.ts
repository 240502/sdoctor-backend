import { Router } from 'express';
import { container } from 'tsyringe';
import { UserController } from '../controllers/userController';
import { authenticate } from '../middlewares/authMiddleware';
const userRouter = Router();
const userController = container.resolve(UserController);
userRouter.post('/login', userController.login.bind(userController));
userRouter.post(
    '/create',
    authenticate,
    userController.createUser.bind(userController),
);
userRouter.post(
    '/update',
    authenticate,
    userController.updateUser.bind(userController),
);
userRouter.post(
    '/delete/:id',
    authenticate,
    userController.deleteUser.bind(userController),
);

userRouter.get(
    '/getById/:id',
    authenticate,
    userController.getUserById.bind(userController),
);
userRouter.post(
    'view',
    authenticate,
    userController.viewUser.bind(userController),
);
export default userRouter;
