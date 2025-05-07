import { injectable } from 'tsyringe';
import { DoctorExpertisesService } from '../services/doctor_expertises.service';
import { Request, Response } from 'express';
import { EducationCreateDto } from '../models/education';
import { EducationService } from '../services/education.service';

@injectable()
export class EducationController {
    constructor(private educationService: EducationService) {}
    async createDoctorExpertises(
        req: Request,
        res: Response,
    ): Promise<void | Response> {
        try {
            const { doctorId, education } = req.body as {
                doctorId: number;
                education: EducationCreateDto[];
            };
            const reuslt = await this.educationService.createEducation(
                doctorId,
                education,
            );
            res.status(201).json({ message: 'Created successful', reuslt });
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    }
}
