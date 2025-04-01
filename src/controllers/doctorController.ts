import { injectable } from 'tsyringe';
import { DoctorService } from '../services/doctor.service';
import { Doctor, DoctorInfo } from '../models/doctor';
import { Request, Response } from 'express';
@injectable()
export class DoctorController {
    constructor(private doctorService: DoctorService) {}

    async getDoctorByUserId(req: Request, res: Response): Promise<void> {
        try {
            const data = await this.doctorService.getDoctorByUserId(
                Number(req.params.userId),
            );
            if (data) {
                res.json(data);
            } else {
                res.status(404).json({ message: 'Không tồn tại bản ghi nào!' });
            }
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }

    async createDoctor(req: Request, res: Response): Promise<void> {
        try {
            const doctor = req.body as DoctorInfo;
            await this.doctorService.createDoctor(doctor);
            res.json({ message: 'Successfully created', result: true });
        } catch (err: any) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    }
    async updateDoctor(req: Request, res: Response): Promise<void> {
        try {
            const doctor = req.body as DoctorInfo;
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
    async getListDoctorsWithPaginationAndFilters(
        req: Request,
        res: Response,
    ): Promise<void> {
        try {
            const object = req.body as {
                pageIndex: number | null;
                pageSize: number | null;
                majorIds: number[] | null;
                clinicId: number | null;
                doctorServiceIds: number[] | null;
                doctorTiles: string[] | null;
                startPrice: number | null;
                endPrice: number | null;
                departmentId: number | null;
            };
            const data =
                await this.doctorService.getListDoctorsWithPaginationAndFilters(
                    object.pageIndex,
                    object.pageSize,
                    object.majorIds,
                    object.clinicId,
                    object.doctorServiceIds,
                    object.doctorTiles,
                    object.startPrice,
                    object.endPrice,
                    object.departmentId,
                );
            if (!data) {
                res.status(404).json({ message: 'Không tồn tại bản ghi nào!' });
                return;
            }
            res.status(200).json({
                totalItems: Math.ceil(data[0].RecordCount),
                page: object.pageIndex,
                pageSize: object.pageSize,
                pageCount: object?.pageSize
                    ? Math.ceil(data[0].RecordCount / object?.pageSize)
                    : null,
                data: data,
                majorIds: object.majorIds,
                clinicId: object.clinicId,
                doctocServiceIds: object.doctorServiceIds,
                doctorTiles: object.doctorTiles,
                startPrice: object.startPrice,
                endPrice: object.endPrice,
            });
        } catch (err: any) {
            res.status(500).json({ message: err.message });
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
            const { pageIndex, pageSize, withoutId } = req.body;
            const data = await this.doctorService.getCommonDoctor(
                pageIndex,
                pageSize,
                withoutId,
            );
            if (Array.isArray(data) && data.length > 0) {
                res.json({
                    data: data,
                    pageCount: Math.ceil(data[0].RecordCount / pageSize),
                    pageIndex: pageIndex,
                    pageSize: pageSize,
                });
            } else res.json('Không tồn tại bản ghi nào!');
        } catch (err: any) {
            res.json({ message: err.message });
        }
    }
    async updateViewsDoctor(req: Request, res: Response): Promise<void> {
        try {
            const id: number = Number(req.params.id);
            await this.doctorService.updateViewsDoctor(id);
            res.json({ message: 'Successfully updated', result: true });
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }
    async updateAvgDoctorStar(req: Request, res: Response): Promise<void> {
        try {
            const doctorId: number = Number(req.params.doctorId);
            await this.doctorService.updateAvgDoctorStar(doctorId);
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }
}
