import { injectable } from 'tsyringe';
import { CategoryService } from '../models/category_service';
import { CategoryServiceRepository } from '../repositories/category_servicesRepository';

@injectable()
export class CategoryServicesService {
    constructor(private categoryServiceRepository: CategoryServiceRepository) {}
    async getAllCategoryServices(): Promise<any> {
        return this.categoryServiceRepository.getAllCategoryServices();
    }
}
