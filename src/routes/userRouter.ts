import { Router } from 'express';
import { container } from 'tsyringe';
import { UserController } from '../controllers/user.controller';
import { authenticate } from '../middlewares/authMiddleware';
const userRouter = Router();
const userController = container.resolve(UserController);
userRouter.post('/login', userController.login.bind(userController));
userRouter.post('/create', userController.createUser.bind(userController));
userRouter.post(
    '/update',
    authenticate,
    userController.updateUser.bind(userController),
);
userRouter.put(
    '/change-password',
    authenticate,
    userController.changePassword.bind(userController),
);

userRouter.post(
    '/delete/:id',
    authenticate,
    userController.deleteUser.bind(userController),
);

userRouter.get('/getById/:id', userController.getUserById.bind(userController));
userRouter.post(
    '/view',
    authenticate,
    userController.viewUser.bind(userController),
);
userRouter.post(
    '/create-account',
    authenticate,
    userController.createAccount.bind(userController),
);
userRouter.put(
    '/update-active',
    authenticate,
    userController.updateUserActiveStatus.bind(userController),
);
userRouter.put(
    '/reset-password',
    authenticate,
    userController.resetPassword.bind(userController),
);

userRouter.post(
    '/refresh-token',
    userController.refreshToken.bind(userController),
);

userRouter.get('/me', userController.getCurrentUser.bind(userController));
userRouter.post('/logout', userController.logout.bind(userController));

export default userRouter;
