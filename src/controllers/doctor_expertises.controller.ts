import { injectable } from 'tsyringe';
import { DoctorExpertisesService } from '../services/doctor_expertises.service';
import { Request, Response } from 'express';
import { DoctorExpertisesCreateDto } from '../models/doctor_expertises';
@injectable()
export class DoctorExpertisesController {
    constructor(private doctorExpertisesService: DoctorExpertisesService) {}
    async getDoctorExpertisesByDoctorId(
        req: Request,
        res: Response,
    ): Promise<void | Response> {
        try {
            const doctorId = Number(req.params.doctorId);
            if (!doctorId) {
                return res.status(400).json({ message: 'Missing doctorId' });
            }
            const result =
                await this.doctorExpertisesService.getDoctorExpertisesByDoctorId(
                    doctorId,
                );
            res.status(200).json(result);
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    }
    async createDoctorExpertises(
        req: Request,
        res: Response,
    ): Promise<void | Response> {
        try {
            const { doctorId, expertises } = req.body as {
                doctorId: number;
                expertises: string[];
            };
            const reuslt =
                await this.doctorExpertisesService.createDoctorExpertises(
                    doctorId,
                    expertises,
                );
            res.status(201).json({ message: 'Created successful', reuslt });
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    }

    async deleteEducation(req: Request, res: Response): Promise<any> {
        try {
            const id: number = Number(req.params.id);
            const result =
                await this.doctorExpertisesService.deleteDoctorExpertise(id);
            res.status(200).json({ message: 'Deleted successful', result });
        } catch (err: any) {
            res.status(400).json({
                message: 'Error!',
                error: err.message,
            });
        }
    }
    async updateDoctorExpertise(req: Request, res: Response): Promise<any> {
        try {
            const { id, expertise }: { id: number; expertise: string } =
                req.body;
            const result =
                await this.doctorExpertisesService.updateDoctorExpertise(
                    id,
                    expertise,
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
