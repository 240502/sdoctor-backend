import { injectable } from 'tsyringe';
import { ExaminationResultService } from '../services/examinationResult.service';
import { Request, Response } from 'express';
import {
    ExaminationResulsCreateDTO,
    ExaminationResultsUpdateDTO,
} from '../models/examination_results';
@injectable()
export class ExaminationResultController {
    constructor(private examinationResultService: ExaminationResultService) {}

    async createExaminationResult(req: Request, res: Response): Promise<any> {
        try {
            const newResult = req.body as ExaminationResulsCreateDTO[];
            const result =
                await this.examinationResultService.createExaminationResult(
                    newResult,
                );
            res.status(201).json({ message: 'created successfully', result });
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    }

    async updateExaminationResult(req: Request, res: Response): Promise<any> {
        try {
            const newResult = req.body as ExaminationResultsUpdateDTO;
            const result =
                await this.examinationResultService.updateExaminationResult(
                    newResult,
                );
            res.status(200).json({ message: 'updated successfully', result });
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    }
}
