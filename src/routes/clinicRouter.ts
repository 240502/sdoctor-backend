import { Router } from 'express';
import { container } from 'tsyringe';
import { ClinicController } from '../controllers/clinic.controller';
import { authenticate } from '../middlewares/authMiddleware';

const clinicRouter = Router();
const clinicController = container.resolve(ClinicController);

/**
 * @swagger
 * tags:
 *   - name: Clinic
 */

/**
 * @swagger
 * /clinic/create:
 *   post:
 *     tags: [Clinic]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Tạo phòng khám thành công
 */
clinicRouter.post(
    '/create',
    authenticate,
    clinicController.createClinic.bind(clinicController),
);

/**
 * @swagger
 * /clinic/update:
 *   put:
 *     tags: [Clinic]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 */
clinicRouter.put(
    '/update',
    authenticate,
    clinicController.updateClinic.bind(clinicController),
);

/**
 * @swagger
 * /clinic/delete/{id}:
 *   delete:
 *     tags: [Clinic]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Xóa thành công
 */
clinicRouter.delete(
    '/delete/:id',
    authenticate,
    clinicController.deleteClinic.bind(clinicController),
);

/**
 * @swagger
 * /clinic/get-by-id/{id}:
 *   get:
 *     tags: [Clinic]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thông tin phòng khám
 */
clinicRouter.get(
    '/get-by-id/:id',
    clinicController.getClinicById.bind(clinicController),
);

/**
 * @swagger
 * /clinic/get-clinic-with-pagination&options:
 *   post:
 *     tags: [Clinic]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Danh sách phòng khám
 */
clinicRouter.post(
    '/get-clinic-with-pagination&options',
    clinicController.getClinicsWithPaginationAndOptions.bind(clinicController),
);

/**
 * @swagger
 * /clinic/get-common-clinic:
 *   get:
 *     tags: [Clinic]
 *     responses:
 *       200:
 *         description: Danh sách phòng khám phổ biến
 */
clinicRouter.get(
    '/get-common-clinic',
    clinicController.getCommonClinic.bind(clinicController),
);

/**
 * @swagger
 * /clinic/update-views/{id}:
 *   put:
 *     tags: [Clinic]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cập nhật lượt xem thành công
 */
clinicRouter.put(
    '/update-views/:id',
    clinicController.updateViewsClinic.bind(clinicController),
);

export default clinicRouter;
