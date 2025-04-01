import { Router } from 'express';
import { container } from 'tsyringe';
import { DepartmentController } from '../controllers/department.controller';

const departmentRouter = Router();
const departmentController = container.resolve(DepartmentController);

departmentRouter.get(
    '/get-all-departments',
    departmentController.getAllDepartment.bind(departmentController),
);
departmentRouter.get(
    '/get-department-by-clinicid/:clinicId',
    departmentController.getDepartmentByClinicId.bind(departmentController),
);

export default departmentRouter;
