import { injectable } from 'tsyringe';
import { CategoryServicesService } from '../services/category_servicesService';
import { CategoryService } from '../models/category_service';
import { Request, Response } from 'express';

@injectable()
export class CategoryServiceController {
    constructor(private categoryServicesService: CategoryServicesService) {}
    async getAllCategoryServices(req: Request, res: Response): Promise<any> {
        try {
            const result =
                await this.categoryServicesService.getAllCategoryServices();
            if (result.length > 0 && Array.isArray(result)) {
                res.json(result);
            } else
                res.status(404).json({ message: 'Không tồn tại bản ghi nào' });
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }
}
