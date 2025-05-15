import { injectable } from 'tsyringe';
import { Request, Response } from 'express';
import { WorkExperiencesService } from '../services/work_experience.service';
import {
    WorkExperienceCreateDto,
    WorkExperienceUpdateDto,
} from '../models/work_experience';

@injectable()
export class WorkExperiencesController {
    constructor(private workExperiencesService: WorkExperiencesService) {}
    async getWorkExperienceByDoctorId(
        req: Request,
        res: Response,
    ): Promise<void | Response> {
        try {
            const doctorId = Number(req.params.doctorId);
            if (!doctorId) {
                return res.status(400).json({ message: 'Missing doctorId' });
            }
            const result =
                await this.workExperiencesService.getWorkExperienceByDoctorId(
                    doctorId,
                );
            res.status(200).json(result);
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    }
    async createWorkExperiences(
        req: Request,
        res: Response,
    ): Promise<void | Response> {
        try {
            const { doctorId, workExperience } = req.body as {
                doctorId: number;
                workExperience: WorkExperienceCreateDto[];
            };
            const reuslt =
                await this.workExperiencesService.createWorkExperiences(
                    doctorId,
                    workExperience,
                );
            res.status(201).json({ message: 'Created successful', reuslt });
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    }
    async deleteWorkExperience(req: Request, res: Response): Promise<any> {
        try {
            const id: number = Number(req.params.id);
            const result =
                await this.workExperiencesService.deleteWorkExperience(id);
            res.status(200).json({ message: 'Deleted successful', result });
        } catch (err: any) {
            res.status(400).json({
                message: 'Error!',
                error: err.message,
            });
        }
    }
    async updateWorkExperience(req: Request, res: Response): Promise<any> {
        try {
            const workExperience: WorkExperienceUpdateDto =
                req.body as WorkExperienceUpdateDto;
            const result =
                await this.workExperiencesService.updateWorkExperience(
                    workExperience,
                );
            res.status(200).json({ message: 'Updated successful', result });
        } catch (err: any) {
            res.status(400).json({
                message: 'Error!',
                error: err.message,
            });
        }
    }
}
