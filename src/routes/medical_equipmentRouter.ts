import { container } from 'tsyringe';
import { Router } from 'express';
import { MedicalEquipmentController } from '../controllers/medical_equipment.controller';
import { authenticate } from '../middlewares/authMiddleware';

const medicalEquipmentRouter = Router();
const medicalEquipmentController = container.resolve(
    MedicalEquipmentController,
);

medicalEquipmentRouter.post(
    '/create',
    authenticate,
    medicalEquipmentController.createMedicalEquipment.bind(
        medicalEquipmentController,
    ),
);

medicalEquipmentRouter.put(
    '/update',
    authenticate,
    medicalEquipmentController.updateMedicalEquipment.bind(
        medicalEquipmentController,
    ),
);

medicalEquipmentRouter.delete(
    '/delete/:id',
    authenticate,
    medicalEquipmentController.deleteMedicalEquipment.bind(
        medicalEquipmentController,
    ),
);

medicalEquipmentRouter.delete(
    '/get-medical-equipment-by-clinicid/:clinicId',
    medicalEquipmentController.getMedicalEquipmentByClinicId.bind(
        medicalEquipmentController,
    ),
);
export default medicalEquipmentRouter;
