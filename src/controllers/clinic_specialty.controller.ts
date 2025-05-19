import { injectable } from 'tsyringe';
import { ClinicSpecialtyService } from '../services/clinic_specialty.service';
import { Request, Response } from 'express';
import { ClinicSpecialty } from '../models/clinic_specialty';
@injectable()
export class ClinicSpecialtyController {
    constructor(private clinicSpecialtyService: ClinicSpecialtyService) {}

    async createClinicSpecialty(req: Request, res: Response): Promise<any> {
        try {
            const clinicSpecialty: ClinicSpecialty =
                req.body as ClinicSpecialty;
            const result =
                await this.clinicSpecialtyService.createClinicSpecialty(
                    clinicSpecialty,
                );
            res.status(201).json({ message: 'Created successful', result });
        } catch (err: any) {
            res.status(400).json({ message: err.message, result: false });
        }
    }
    async updateClinicSpecialty(req: Request, res: Response): Promise<any> {
        try {
            const clinicSpecialty: ClinicSpecialty =
                req.body as ClinicSpecialty;
            const result =
                await this.clinicSpecialtyService.updateClinicSpecialty(
                    clinicSpecialty,
                );
            res.status(201).json({ message: 'Updated successful', result });
        } catch (err: any) {
            res.status(400).json({ message: err.message, result: false });
        }
    }

    async deleteClinicSpecialty(req: Request, res: Response): Promise<any> {
        try {
            const id: number = Number(req.params.id);
            const result =
                await this.clinicSpecialtyService.deleteClinicSpecialty(id);
            res.status(201).json({ message: 'Deleted successful', result });
        } catch (err: any) {
            res.status(400).json({ message: err.message, result: false });
        }
    }

    async getClinicSpecialtyByClinicId(
        req: Request,
        res: Response,
    ): Promise<any> {
        try {
            const clinicId: number = Number(req.params.clinicId);
            const result =
                await this.clinicSpecialtyService.getClinicSpecialtyByClinicId(
                    clinicId,
                );
            if (!result) {
                return res
                    .json(404)
                    .json({ message: 'Not found', result: false });
            }
            res.status(200).json(result);
        } catch (err: any) {
            res.status(400).json({ message: err.message, result: false });
        }
    }
}
