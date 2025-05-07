import { injectable } from 'tsyringe';
import { Request, Response } from 'express';
import { WorkExperiencesService } from '../services/work_experience.service';
import { WorkExperienceCreateDto } from '../models/work_experience';

@injectable()
export class WorkExperiencesController {
    constructor(private workExperiencesService: WorkExperiencesService) {}
    async createWorkExperiences(
        req: Request,
        res: Response,
    ): Promise<void | Response> {
        try {
            const { doctorId, workExperienceCreateDto } = req.body as {
                doctorId: number;
                workExperienceCreateDto: WorkExperienceCreateDto[];
            };
            const reuslt =
                await this.workExperiencesService.createWorkExperiences(
                    doctorId,
                    workExperienceCreateDto,
                );
            res.status(201).json({ message: 'Created successful', reuslt });
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    }
}
