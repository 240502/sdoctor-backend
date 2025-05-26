import { injectable } from 'tsyringe';
import { Request, Response } from 'express';
import { DoctorServiceService } from '../services/doctor_service.service';
import {
    DoctorServiceCreateDTO,
    DoctorServiceUpdateDTO,
} from '../models/doctor_service';
@injectable()
export class DoctorServiceController {
    constructor(private doctorServiceService: DoctorServiceService) {}
    async createDoctorService(req: Request, res: Response) {
        try {
            const doctorService: DoctorServiceCreateDTO =
                req.body as DoctorServiceCreateDTO;
            const result =
                await this.doctorServiceService.createDoctorService(
                    doctorService,
                );
            res.status(201).json({ message: 'created successfully', result });
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    }

    async updateDoctorService(req: Request, res: Response) {
        try {
            const doctorService: DoctorServiceUpdateDTO =
                req.body as DoctorServiceUpdateDTO;
            const result =
                await this.doctorServiceService.updateDoctorService(
                    doctorService,
                );
            res.status(200).json({ message: 'updated successfully', result });
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    }

    async deleteDoctorService(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                throw new Error('Invalid ID format.');
            }
            const result =
                await this.doctorServiceService.deleteDoctorService(id);
            res.status(200).json({ message: 'deleted successfully', result });
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    }

    async getDoctorServices(req: Request, res: Response) {
        try {
            const doctorId = parseInt(req.params.doctorId);
            if (isNaN(doctorId)) {
                throw new Error('Invalid doctor ID format.');
            }
            const result =
                await this.doctorServiceService.getDoctorServices(doctorId);
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({
                    message: 'No services found for this doctor.',
                });
            }
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }
}
