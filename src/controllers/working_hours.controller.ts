import { injectable } from 'tsyringe';
import { Request, Response } from 'express';
import { WorkingHoursService } from '../services/working_hours.service';
import { WorkingHours, WorkingHoursCreateDto } from '../models/working_hours';
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

    async updateWorkingHours(req: Request, res: Response): Promise<any> {
        try {
            const workingHours: WorkingHours = req.body as WorkingHours;
            const result =
                await this.workingHoursService.updateWorkingHours(workingHours);
            res.status(201).json({ message: 'Updated successful', result });
        } catch (err: any) {
            res.status(400).json({ message: err.message, result: false });
        }
    }

    async deleteWorkingHours(req: Request, res: Response): Promise<any> {
        try {
            const id: number = Number(req.params.id);
            const result =
                await this.workingHoursService.deleteWorkingHours(id);
            res.status(201).json({ message: 'Deleted successful', result });
        } catch (err: any) {
            res.status(400).json({ message: err.message, result: false });
        }
    }

    async getWorkingHoursByClinicId(req: Request, res: Response): Promise<any> {
        try {
            const clinicId: number = Number(req.params.clinicId);
            const result =
                await this.workingHoursService.getWorkingHoursByClinicId(
                    clinicId,
                );
            if (!result) {
                return res
                    .status(404)
                    .json({ message: 'Not found', result: false });
            }
            res.status(201).json(result);
        } catch (err: any) {
            res.status(400).json({ message: err.message, result: false });
        }
    }
}
