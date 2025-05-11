import { container } from 'tsyringe';
import { Router } from 'express';
import { DegreesController } from '../controllers/degrees.controller';

const degreesRouter = Router();
const degreesController = container.resolve(DegreesController);

/**
 * @swagger
 * tags:
 *   name: Degrees
 */

/**
 * @swagger
 * /degree/get-all-degrees:
 *   get:
 *     tags: [Degrees]
 *     responses:
 *       200:
 *         description: A list of degrees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 */
degreesRouter.get(
    '/get-all-degrees',
    degreesController.getAllDegrees.bind(degreesController),
);

export default degreesRouter;
