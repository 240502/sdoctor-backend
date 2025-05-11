import { Router } from 'express';
import { container } from 'tsyringe';
import { MedicalPackageController } from '../controllers/medical_package.controller';
import { authenticate } from '../middlewares/authMiddleware';

/**
 * @swagger
 * tags:
 *   name: MedicalPackage
 */

const medicalPackageRouter = Router();
const medicalPackageController = container.resolve(MedicalPackageController);

/**
 * @swagger
 * /medical-package/create:
 *   post:
 *     tags: [MedicalPackage]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Successfully created medical package
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
medicalPackageRouter.post(
    '/create',
    authenticate,
    medicalPackageController.createService.bind(medicalPackageController),
);

/**
 * @swagger
 * /medical-package/update:
 *   put:
 *     tags: [MedicalPackage]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Successfully updated medical package
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
medicalPackageRouter.put(
    '/update',
    authenticate,
    medicalPackageController.updateService.bind(medicalPackageController),
);

/**
 * @swagger
 * /medical-package/delete/{id}:
 *   delete:
 *     tags: [MedicalPackage]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted medical package
 *       404:
 *         description: Medical package not found
 *       500:
 *         description: Internal server error
 */
medicalPackageRouter.delete(
    '/delete/:id',
    authenticate,
    medicalPackageController.deleteService.bind(medicalPackageController),
);

/**
 * @swagger
 * /medical-package/view:
 *   post:
 *     tags: [MedicalPackage]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Successfully fetched medical packages
 *       500:
 *         description: Internal server error
 */
medicalPackageRouter.post(
    '/view',
    medicalPackageController.getMedicalPackagesWithPaginationAndOptions.bind(
        medicalPackageController,
    ),
);

/**
 * @swagger
 * /medical-package/get-by-id/{id}:
 *   get:
 *     tags: [MedicalPackage]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully fetched medical package by ID
 *       404:
 *         description: Medical package not found
 *       500:
 *         description: Internal server error
 */
medicalPackageRouter.get(
    '/get-by-id/:id',
    medicalPackageController.getMedicalPackageById.bind(
        medicalPackageController,
    ),
);

/**
 * @swagger
 * /medical-package/get-common-medical-package:
 *   get:
 *     tags: [MedicalPackage]
 *     responses:
 *       200:
 *         description: Successfully fetched common medical package
 *       500:
 *         description: Internal server error
 */
medicalPackageRouter.get(
    '/get-common-medical-package',
    medicalPackageController.getCommonMedicalPackage.bind(
        medicalPackageController,
    ),
);

/**
 * @swagger
 * /medical-package/get-medical-package-by-clinicid/{clinicId}:
 *   get:
 *     tags: [MedicalPackage]
 *     parameters:
 *       - in: path
 *         name: clinicId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully fetched medical package by clinic ID
 *       500:
 *         description: Internal server error
 */
medicalPackageRouter.get(
    '/get-medical-package-by-clinicid/:clinicId',
    medicalPackageController.getMedicalPackageByClinicId.bind(
        medicalPackageController,
    ),
);

/**
 * @swagger
 * /medical-package/update-views/{id}:
 *   put:
 *     tags: [MedicalPackage]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully updated views for the medical package
 *       500:
 *         description: Internal server error
 */
medicalPackageRouter.put(
    '/update-views/:id',
    medicalPackageController.updateMedicalPackageViews.bind(
        medicalPackageController,
    ),
);

export default medicalPackageRouter;
