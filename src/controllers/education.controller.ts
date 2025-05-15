import { injectable } from 'tsyringe';
import { Request, Response } from 'express';
import { EducationCreateDto, EducationUpdateDto } from '../models/education';
import { EducationService } from '../services/education.service';

@injectable()
export class EducationController {
    constructor(private educationService: EducationService) {}
    async getEducationByDoctorId(
        req: Request,
        res: Response,
    ): Promise<void | Response> {
        try {
            const doctorId = Number(req.params.doctorId);
            if (!doctorId) {
                return res.status(400).json({ message: 'Missing doctorId' });
            }
            const result =
                await this.educationService.getEducationByDoctorId(doctorId);
            res.status(200).json(result);
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    }
    async createDoctorEducation(
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
    async deleteEducation(req: Request, res: Response): Promise<any> {
        try {
            const id: number = Number(req.params.id);
            const result = await this.educationService.deleteEducation(id);
            res.status(200).json({ message: 'Deleted successful', result });
        } catch (err: any) {
            res.status(400).json({
                message: 'Error!',
                error: err,
            });
        }
    }
    async updateEducation(req: Request, res: Response): Promise<any> {
        try {
            const workExperience: EducationUpdateDto =
                req.body as EducationUpdateDto;
            const result =
                await this.educationService.updateEducation(workExperience);
            res.status(200).json({ message: 'Updated successful', result });
        } catch (err: any) {
            res.status(400).json({
                message: 'Error!',
                error: err,
            });
        }
    }
}
