import { injectable } from 'tsyringe';
import { Request, Response } from 'express';
import { WorkingHoursService } from '../services/working_hours.service';
import { WorkingHoursCreateDto } from '../models/working_hours';
@injectable()
export class WorkingHoursController {
    constructor(private workingHoursService: WorkingHoursService) {}

    async createWorkingHours(req: Request, res: Response): Promise<any> {
        try {
            const workingHours: WorkingHoursCreateDto =
                req.body as WorkingHoursCreateDto;
            const result =
                await this.workingHoursService.createWorkingHours(workingHours);
            res.status(201).json({ message: 'Created successful', result });
        } catch (err: any) {
            res.status(400).json({ message: err.message, result: false });
        }
    }
}
