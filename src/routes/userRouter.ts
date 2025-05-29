import { Router } from 'express';
import { container } from 'tsyringe';
import { UserController } from '../controllers/user.controller';
import { authenticate } from '../middlewares/authMiddleware';

/**
 * @swagger
 * tags:
 *   name: User
 */

const userRouter = Router();
const userController = container.resolve(UserController);

/**
 * @swagger
 * /user/login:
 *   post:
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully logged in
 *       401:
 *         description: Invalid credentials
 */
userRouter.post('/login', userController.login.bind(userController));

/**
 * @swagger
 * /user/create:
 *   post:
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: User successfully created
 *       400:
 *         description: Bad request
 */
userRouter.post('/create', userController.createUser.bind(userController));

/**
 * @swagger
 * /user/update:
 *   post:
 *     tags: [User]
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User details updated
 */
userRouter.put(
    '/update',
    authenticate,
    userController.updateUser.bind(userController),
);

/**
 * @swagger
 * /user/change-password:
 *   put:
 *     tags: [User]
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password changed successfully
 */
userRouter.put(
    '/change-password',
    authenticate,
    userController.changePassword.bind(userController),
);

/**
 * @swagger
 * /user/delete/{id}:
 *   post:
 *     tags: [User]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User successfully deleted
 *       400:
 *         description: Bad request
 */
userRouter.post(
    '/delete/:id',
    authenticate,
    userController.deleteUser.bind(userController),
);

/**
 * @swagger
 * /user/getById/{id}:
 *   get:
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User data
 */
userRouter.get('/getById/:id', userController.getUserById.bind(userController));

/**
 * @swagger
 * /user/view:
 *   post:
 *     tags: [User]
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: User details
 */
userRouter.post(
    '/view',
    authenticate,
    userController.viewUser.bind(userController),
);

/**
 * @swagger
 * /user/create-account:
 *   post:
 *     tags: [User]
 *     security:
 *       - Bearer: []
 *     responses:
 *       201:
 *         description: Account created successfully
 */
userRouter.post(
    '/create-account',
    authenticate,
    userController.createAccount.bind(userController),
);

/**
 * @swagger
 * /user/update-active:
 *   put:
 *     tags: [User]
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: User active status updated
 */
userRouter.put(
    '/update-active',
    authenticate,
    userController.updateUserActiveStatus.bind(userController),
);

/**
 * @swagger
 * /user/reset-password:
 *   put:
 *     tags: [User]
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Password reset successfully
 */
userRouter.put(
    '/reset-password',
    authenticate,
    userController.resetPassword.bind(userController),
);

/**
 * @swagger
 * /user/refresh-token:
 *   post:
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 */
userRouter.post(
    '/refresh-token',
    userController.refreshToken.bind(userController),
);

/**
 * @swagger
 * /user/me:
 *   get:
 *     tags: [User]
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Current user data
 */
userRouter.get('/me', userController.getCurrentUser.bind(userController));

/**
 * @swagger
 * /user/logout:
 *   post:
 *     tags: [User]
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: User logged out successfully
 */
userRouter.post('/logout', userController.logout.bind(userController));

export default userRouter;
