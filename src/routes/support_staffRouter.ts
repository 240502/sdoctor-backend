import { Router } from 'express';
import { container } from 'tsyringe';
import { SupportStaffController } from '../controllers/support_staff.controller';
import { authenticate } from '../middlewares/authMiddleware';
const supportStaffRouter = Router();

const supportStaffController = container.resolve(SupportStaffController);

supportStaffRouter.post(
    '/create',
    authenticate,
    supportStaffController.createSupportStaff.bind(supportStaffController),
);

supportStaffRouter.put(
    '/update',
    authenticate,
    supportStaffController.updateSupportStaff.bind(supportStaffController),
);

supportStaffRouter.delete(
    '/delete/:id',
    authenticate,
    supportStaffController.deleteSupportStaff.bind(supportStaffController),
);

supportStaffRouter.get(
    '/get-support-staffs',
    supportStaffController.getSupportStaffs.bind(supportStaffController),
);

supportStaffRouter.get(
    '/get-by-id/:employeeId',
    supportStaffController.getSupportStaffById.bind(supportStaffController),
);

export default supportStaffRouter;
