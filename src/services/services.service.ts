import { injectable } from 'tsyringe';
import { ServiceRepository } from '../repositories/serviceRepository';
@injectable()
export class ServicesService {
    constructor(private serviceRepository: ServiceRepository) {}
    async getServiceByDepartmentAndDoctor(
        department: number,
        doctorId: number,
    ): Promise<any> {
        try {
            if (!department || !doctorId) {
                throw new Error('Thiếu tham số để lấy dữ liệu!');
            }
            return await this.serviceRepository.getServiceByDepartmentAndDoctor(
                department,
                doctorId,
            );
        } catch (err: any) {
            throw err;
        }
    }
    async getAllDoctorService(): Promise<any> {
        return this.serviceRepository.getAllDoctorService();
    }
    async getServiceByDepartmentId(departmentId: number): Promise<any> {
        return this.serviceRepository.getServiceByDepartmentId(departmentId);
    }
}
