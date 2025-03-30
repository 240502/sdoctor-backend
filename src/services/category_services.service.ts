import { injectable } from 'tsyringe';
import { CategoryServiceRepository } from '../repositories/serviceCategoryRepository';

@injectable()
export class CategoryServicesService {
    constructor(private categoryServiceRepository: CategoryServiceRepository) {}
    async getAll(): Promise<any> {
        return this.categoryServiceRepository.getAll();
    }
}
