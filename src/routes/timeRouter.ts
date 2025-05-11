import { Router } from 'express';
import { container } from 'tsyringe';
import { TimeController } from '../controllers/time.controller';

/**
 * @swagger
 * tags:
 *   name: Time
 */

const timeRouter = Router();
const timeController = container.resolve(TimeController);

/**
 * @swagger
 * /time/get-by-id/{id}:
 *   get:
 *     tags: [Time]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the time
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A time object with the given ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 time:
 *                   type: string
 *                 description:
 *                   type: string
 *       404:
 *         description: Time not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /time/get-by-type:
 *   post:
 *     tags: [Time]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 description: The type of the time to fetch
 *     responses:
 *       200:
 *         description: A list of times based on the given type
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   time:
 *                     type: string
 *                   description:
 *                     type: string
 *       500:
 *         description: Internal server error
 */
timeRouter.get(
    '/get-by-id/:id',
    timeController.getTimeById.bind(timeController),
);

timeRouter.post(
    '/get-by-type',
    timeController.getTimeByTimeType.bind(timeController),
);

export default timeRouter;
