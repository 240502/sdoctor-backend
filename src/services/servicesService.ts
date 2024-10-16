import { injectable } from 'tsyringe';
import { ServicesRepository } from '../repositories/servicesRepository';
import { Services } from '../models/services';

@injectable()
export class ServicesService {
    constructor(private servicesRepository: ServicesRepository) {}
    async createService(services: Services): Promise<any> {
        return this.servicesRepository.createService(services);
    }
    async updateService(services: Services): Promise<any> {
        return this.servicesRepository.updateService(services);
    }
    async deleteService(id: number): Promise<any> {
        return this.servicesRepository.deleteService(id);
    }
    async getServiceView(
        pageIndex: number,
        pageSize: number,
        categoryId: number,
        startPrice: number,
        endPrice: number,
        location: string,
        clinicId: number,
        name: any,
    ): Promise<any> {
        return this.servicesRepository.getServiceView(
            pageIndex,
            pageSize,
            categoryId,
            startPrice,
            endPrice,
            location,
            clinicId,
            name,
        );
    }
    async getServiceById(id: number): Promise<any> {
        return this.servicesRepository.getServiceById(id);
    }
    async getCommonService(): Promise<any> {
        return this.servicesRepository.getCommonService();
    }
    async updateViewsService(id: number): Promise<any> {
        return this.servicesRepository.updateViewsService(id);
    }
}
