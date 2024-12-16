import { injectable } from 'tsyringe';
import { ServiceRepository } from '../repositories/serviceRepository';
import { Service } from '../models/service';

@injectable()
export class ServiceService {
    constructor(private serviceRepository: ServiceRepository) {}
    async createService(service: Service): Promise<any> {
        return this.serviceRepository.createService(service);
    }
    async updateService(service: Service): Promise<any> {
        return this.serviceRepository.updateService(service);
    }
    async deleteService(id: number): Promise<any> {
        return this.serviceRepository.deleteService(id);
    }
    async getServiceById(id: number): Promise<any> {
        return this.serviceRepository.getServiceById(id);
    }
    async viewService(
        pageIndex: number,
        pageSize: number,
        clinicId: number,
        categoryId: number,
        startPrice: number,
        endPrice: number,
    ): Promise<any> {
        return this.serviceRepository.viewService(
            pageIndex,
            pageSize,
            clinicId,
            categoryId,
            startPrice,
            endPrice,
        );
    }
}
