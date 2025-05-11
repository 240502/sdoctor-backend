import { Router } from 'express';
import { container } from 'tsyringe';
import { PatientProfileController } from '../controllers/patient_profile.controller';

/**
 * @swagger
 * tags:
 *   name: PatientProfile
 */

const patientProfileRouter = Router();
const patientProfileController = container.resolve(PatientProfileController);

/**
 * @swagger
 * /patient-profile/create:
 *   post:
 *     tags: [PatientProfile]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       201:
 *         description: Successfully created patient profile
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */
patientProfileRouter.post(
    '/create',
    patientProfileController.createPatientProfile.bind(
        patientProfileController,
    ),
);

/**
 * @swagger
 * /patient-profile/get-by-phone-or-email:
 *   post:
 *     tags: [PatientProfile]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully fetched patient profile
 *       404:
 *         description: Patient profile not found
 *       500:
 *         description: Internal server error
 */
patientProfileRouter.post(
    '/get-by-phone-or-email',
    patientProfileController.getProfileByPhoneOrEmail.bind(
        patientProfileController,
    ),
);

/**
 * @swagger
 * /patient-profile/update:
 *   put:
 *     tags: [PatientProfile]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uuid:
 *                 type: string
 *               fullName:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully updated patient profile
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Patient profile not found
 *       500:
 *         description: Internal server error
 */
patientProfileRouter.put(
    '/update',
    patientProfileController.updatePatientProfile.bind(
        patientProfileController,
    ),
);

/**
 * @swagger
 * /patient-profile/delete/{uuid}:
 *   delete:
 *     tags: [PatientProfile]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted patient profile
 *       404:
 *         description: Patient profile not found
 *       500:
 *         description: Internal server error
 */
patientProfileRouter.delete(
    '/delete/:uuid',
    patientProfileController.deletePatientProfile.bind(
        patientProfileController,
    ),
);

/**
 * @swagger
 * /patient-profile/get-by-uuid/{uuid}:
 *   get:
 *     tags: [PatientProfile]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully fetched patient profile
 *       404:
 *         description: Patient profile not found
 *       500:
 *         description: Internal server error
 */
patientProfileRouter.get(
    '/get-by-uuid/:uuid',
    patientProfileController.getPatientProfileByUuid.bind(
        patientProfileController,
    ),
);

/**
 * @swagger
 * /patient-profile/get-patient-profiles:
 *   post:
 *     tags: [PatientProfile]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               page:
 *                 type: integer
 *               limit:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Successfully fetched patient profiles
 *       500:
 *         description: Internal server error
 */
patientProfileRouter.post(
    '/get-patient-profiles',
    patientProfileController.getPatientProfiles.bind(patientProfileController),
);

export default patientProfileRouter;
