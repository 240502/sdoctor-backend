import { injectable } from 'tsyringe';
import { DoctorService } from '../services/doctorService';
import { Doctor } from '../models/doctor';
import { Request, Response } from 'express';
@injectable()
export class DoctorController {
    constructor(private doctorService: DoctorService) {}
    async createDoctor(req: Request, res: Response): Promise<void> {
        try {
            const doctor = req.body as Doctor;
            await this.doctorService.createDoctor(doctor);
            res.json({ message: 'Successfully created', result: true });
        } catch (err: any) {
            res.json({ message: err.message });
        }
    }
    async updateDoctor(req: Request, res: Response): Promise<void> {
        try {
            const doctor = req.body as Doctor;
            await this.doctorService.updateDoctor(doctor);
            res.json({ message: 'Successfully updated', result: true });
        } catch (err: any) {
            res.json({ message: err.message });
        }
    }

    async deleteDoctor(req: Request, res: Response): Promise<void> {
        try {
            const id: Number = Number(req.params.id);
            await this.doctorService.deleteDoctor(id);
            res.json({ message: 'Successfully deleted', result: true });
        } catch (err: any) {
            res.json({ message: err.message });
        }
    }
    async getDoctorById(req: Request, res: Response): Promise<void> {
        try {
            const id: number = Number(req.params.id);
            const doctor = await this.doctorService.getDoctorById(id);
            if (doctor) {
                res.json(doctor);
            } else {
                res.status(404).json({ message: 'Bản ghi không tồn tại!' });
            }
        } catch (err: any) {
            const id: Number = Number(req.params.id);
            res.status(500).json({ message: err.message, result: id });
        }
    }
    async getDoctorView(req: Request, res: Response): Promise<void> {
        try {
            const object = req.body as {
                pageIndex: number;
                pageSize: number;
                majorId: number;
                location: String;
            };
            const data = await this.doctorService.getDoctorView(
                object.pageIndex,
                object.pageSize,
                object.majorId ?? null,
                object.location ?? null,
            );
            if (Array.isArray(data) && data.length > 0) {
                res.status(200).json({
                    totalItems: Math.ceil(data[0].RecordCount),
                    page: object.pageIndex,
                    pageSize: object.pageSize,
                    data: data,
                    pageCount: Math.ceil(data[0].RecordCount / object.pageSize),
                    majorId: object.majorId,
                    location: object.location,
                });
            } else {
                res.status(404).json({ message: 'Không tồn tại bản ghi nào!' });
            }
        } catch (err: any) {
            res.json({ message: err.message });
        }
    }
    async getQuantityDoctor(req: Request, res: Response): Promise<void> {
        try {
            const data: number = await this.doctorService.getQuantityDoctor();
            if (data) {
                res.json({ totalDoctor: data });
            } else res.status(404).json({ message: 'Không có bác sĩ nào!' });
        } catch (err: any) {
            res.json({ message: err.message });
        }
    }
    async getCommonDoctor(req: Request, res: Response): Promise<void> {
        try {
            const data: Doctor[] = await this.doctorService.getCommonDoctor();
            if (Array.isArray(data) && data.length > 0) {
                res.json(data);
            }
        } catch (err: any) {
            res.json({ message: err.message });
        }
    }
}
