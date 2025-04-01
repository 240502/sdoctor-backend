import { injectable } from 'tsyringe';
import { MedicalPackageService } from '../services/medical_package.service';
import { Service } from '../models/service';
import { Request, Response } from 'express';

@injectable()
export class MedicalPackageController {
    constructor(private medicalPackageService: MedicalPackageService) {}

    async getMedicalPackageByClinicId(
        req: Request,
        res: Response,
    ): Promise<void | Response> {
        try {
            const clinicId: number = Number(req.params.clinicId);
            const data =
                await this.medicalPackageService.getMedicalPackageByClinicId(
                    clinicId,
                );
            if (!data) {
                return res.status(404).json({ message: 'Không có dữ liệu!' });
            }
            res.status(200).json(data);
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }
    async createService(req: Request, res: Response): Promise<any> {
        try {
            const service: Service = req.body as Service;
            const newService =
                await this.medicalPackageService.createService(service);
            res.json({ message: 'success', result: newService });
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }
    async updateService(req: Request, res: Response): Promise<void> {
        try {
            const service: Service = req.body as Service;
            await this.medicalPackageService.updateService(service);
            res.json({ message: 'success', result: true });
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }
    async deleteService(req: Request, res: Response): Promise<void> {
        try {
            const id: number = Number(req.params.id);
            await this.medicalPackageService.deleteService(id);
            res.json({ message: 'success', result: true });
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }
    async getServiceById(req: Request, res: Response): Promise<void> {
        try {
            const id: number = Number(req.params.id);
            const result = await this.medicalPackageService.getServiceById(id);
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({ message: 'Không tồn tại bản ghi nào!' });
            }
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }
    async updateViewService(req: Request, res: Response): Promise<void> {
        try {
            const id: number = Number(req.params.id);
            await this.medicalPackageService.updateViewService(id);

            res.status(200).json({ message: 'success' });
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }
    async viewService(req: Request, res: Response): Promise<void> {
        try {
            const {
                pageIndex,
                pageSize,
                clinicId,
                categoryId,
                startPrice,
                endPrice,
            } = req.body;
            const result = await this.medicalPackageService.viewService(
                pageIndex,
                pageSize,
                clinicId,
                categoryId,
                startPrice,
                endPrice,
            );
            if (result) {
                res.status(200).json({
                    pageIndex: pageIndex,
                    pageSize: pageSize,
                    totalItems: result[0].RecordCount,
                    data: result,
                    pageCount: Math.ceil(result[0].RecordCount / pageSize),
                    clinicId: clinicId,
                    categoryId: categoryId,
                    startPrice: startPrice,
                    endPrice: endPrice,
                });
            } else {
                res.status(404).json({ message: 'Không tồn tại bản ghi nào!' });
            }
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }
    async getCommonService(req: Request, res: Response): Promise<void> {
        try {
            const result = await this.medicalPackageService.getCommonService();
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({ message: 'Không có bản ghi nào!' });
            }
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }
}
