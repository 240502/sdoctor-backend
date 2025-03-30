import { Router } from 'express';
import { container } from 'tsyringe';
import { DepartmentController } from '../controllers/department.controller';

const departmentRouter = Router();
const departmentController = container.resolve(DepartmentController);

departmentRouter.get(
    '/get-all-departments',
    departmentController.getAllDepartment.bind(departmentController),
);

export default departmentRouter;
