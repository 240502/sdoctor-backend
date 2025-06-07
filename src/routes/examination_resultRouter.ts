import { Router } from 'express';
import { container } from 'tsyringe';
import { ExaminationResultController } from '../controllers/examination_result.controller';

const examinationResultRouter = Router();
const examinationResultController = container.resolve(
    ExaminationResultController,
);

examinationResultRouter.post(
    '/create-result',
    examinationResultController.createExaminationResult.bind(
        examinationResultController,
    ),
);
examinationResultRouter.put(
    '/update-result',
    examinationResultController.createExaminationResult.bind(
        examinationResultController,
    ),
);
export default examinationResultRouter;
