import { container } from 'tsyringe';
import { Router } from 'express';
import { MedicalEquipmentController } from '../controllers/medical_equipment.controller';

const medicalEquipmentRouter = Router();
const medicalEquipmentController = container.resolve(
    MedicalEquipmentController,
);

medicalEquipmentRouter.get(
    '/create',
    medicalEquipmentController.createMedicalEquipment.bind(
        medicalEquipmentController,
    ),
);

export default medicalEquipmentRouter;
