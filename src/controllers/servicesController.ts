import { injectable } from 'tsyringe';
import { ServicesService } from '../services/servicesService';
import { Services } from '../models/services';
import { Request, Response } from 'express';

@injectable()
export class ServicesController {
    constructor(private servicesService: ServicesService) {}
    async createService(req: Request, res: Response): Promise<void> {
        try {
            const service: Services = req.body as Services;
            await this.servicesService.createService(service);
            res.json({ message: 'Successfully created' });
        } catch (err: any) {
            res.json({ message: err.message });
        }
    }

    async updateService(req: Request, res: Response): Promise<void> {
        try {
            const service: Services = req.body as Services;
            await this.servicesService.updateService(service);
            res.json({ message: 'Successfully updated' });
        } catch (err: any) {
            res.json({ message: err.message });
        }
    }

    async deleteService(req: Request, res: Response): Promise<void> {
        try {
            const id: number = Number(req.params.id);
            await this.servicesService.deleteService(id);
            res.json({ message: 'Successfully deleted' });
        } catch (err: any) {
            res.json({ message: err.message });
        }
    }

    async getServiceById(req: Request, res: Response): Promise<void> {
        try {
            const id: number = Number(req.params.id);
            const service: Services =
                await this.servicesService.getServiceById(id);
            if (service) {
                res.json(service);
            } else {
                res.status(404).json({ message: 'Không tồn tại dịch vụ!' });
            }
        } catch (err: any) {
            res.json({ message: err.message });
        }
    }
    async getServiceView(req: Request, res: Response): Promise<void> {
        try {
            const {
                pageIndex,
                pageSize,
                categoryId,
                startPrice,
                endPrice,
                location,
                clinicId,
            } = req.body;
            const data = await this.servicesService.getServiceView(
                pageIndex,
                pageSize,
                categoryId ?? null,
                startPrice ?? null,
                endPrice ?? null,
                location ?? null,
                clinicId ?? null,
            );
            if (data) {
                res.json({
                    totalItems: data[0].RecordCount,
                    page: pageIndex,
                    pageSize: pageSize,
                    data: data,
                    pageCount: Math.ceil(data[0].RecordCount / pageSize),
                    categoryId,
                    startPrice,
                    endPrice,
                    location,
                    clinicId,
                });
            } else {
                res.status(404).json({ message: 'Không tồn tại bản ghi nào!' });
            }
        } catch (err: any) {
            res.json({ message: err.message });
        }
    }
}
