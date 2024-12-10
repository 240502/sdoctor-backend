import { DoctorServiceController } from '../controllers/doctorServiceController';
import { Router } from 'express';
import { container } from 'tsyringe';

const doctorServiceRouter = Router();
const doctorServiceController = container.resolve(DoctorServiceController);

doctorServiceRouter.get(
    'get-all',
    doctorServiceController.getAllDoctorServices.bind(doctorServiceController),
);


export default doctorServiceRouter;