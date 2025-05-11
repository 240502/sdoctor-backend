import { Router } from 'express';
import { container } from 'tsyringe';
import { StatusController } from '../controllers/status.controller';

/**
 * @swagger
 * tags:
 *   name: Status
 */

const statusRouter = Router();
const statusController = container.resolve(StatusController);

/**
 * @swagger
 * /status/getAll:
 *   get:
 *     tags: [Status]
 *     responses:
 *       200:
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
statusRouter.get(
    '/getAll',
    statusController.getAllStatus.bind(statusController),
);

export default statusRouter;
