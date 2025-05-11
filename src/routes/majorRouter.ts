import { Router } from 'express';
import { container } from 'tsyringe';
import { MajorController } from '../controllers/major.controller';

/**
 * @swagger
 * tags:
 *   name: Specialties
 */

const majorRouter = Router();
const majorController = container.resolve(MajorController);

/**
 * @swagger
 * /major/get-common-major:
 *   get:
 *     tags: [Specialties]
 *     responses:
 *       200:
 *         description: Successfully fetched common major
 *       500:
 *         description: Internal server error
 */
majorRouter.get(
    '/get-common-major',
    majorController.getCommonMajor.bind(majorController),
);

/**
 * @swagger
 * /major/get-all-major:
 *   get:
 *     tags: [Specialties]
 *     responses:
 *       200:
 *         description: Successfully fetched all majors
 *       500:
 *         description: Internal server error
 */
majorRouter.get(
    '/get-all-major',
    majorController.getAllMajor.bind(majorController),
);

/**
 * @swagger
 * /major/get-by-id/{id}:
 *   get:
 *     tags: [Specialties]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully fetched major by ID
 *       404:
 *         description: Major not found
 *       500:
 *         description: Internal server error
 */
majorRouter.get(
    '/get-by-id/:id',
    majorController.getMajorById.bind(majorController),
);

/**
 * @swagger
 * /major/view:
 *   post:
 *     tags: [Specialties]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               majorId:
 *                 type: string
 *                 description: ID of the major to view
 *     responses:
 *       200:
 *         description: Successfully viewed major
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */
majorRouter.post('/view', majorController.viewMajor.bind(majorController));

export default majorRouter;
