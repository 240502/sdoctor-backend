import { injectable } from 'tsyringe';
import { ServiceRepository } from '../repositories/serviceRepository';
@injectable()
export class ServicesService {
    constructor(private serviceRepository: ServiceRepository) {}
    async getAllDoctorService(): Promise<any> {
        return this.serviceRepository.getAllDoctorService();
    }
    async getServiceByDepartmentId(departmentId: number): Promise<any> {
        return this.serviceRepository.getServiceByDepartmentId(departmentId);
    }
}
