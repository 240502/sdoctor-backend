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
}
