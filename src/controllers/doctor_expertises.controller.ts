import { injectable } from 'tsyringe';
import { DoctorExpertisesService } from '../services/doctor_expertises.service';
import { Request, Response } from 'express';
import { DoctorExpertisesCreateDto } from '../models/doctor_expertises';
@injectable()
export class DoctorExpertisesController {
    constructor(private doctorExpertisesService: DoctorExpertisesService) {}
    async createDoctorExpertises(
        req: Request,
        res: Response,
    ): Promise<void | Response> {
        try {
            const { doctorId, specialtyId, expertises } = req.body as {
                doctorId: number;
                specialtyId: number;
                expertises: DoctorExpertisesCreateDto[];
            };
            const reuslt =
                await this.doctorExpertisesService.createDoctorExpertises(
                    doctorId,
                    specialtyId,
                    expertises,
                );
            res.status(201).json({ message: 'Created successful', reuslt });
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    }
}
