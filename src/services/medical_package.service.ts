import { injectable } from 'tsyringe';
import { MedicalPackageRepository } from '../repositories/medical_packageRepository';
import { Service } from '../models/service';

@injectable()
export class MedicalPackageService {
    constructor(private medicalPackageRepository: MedicalPackageRepository) {}

    async getMedicalPackageByClinicId(clinicId: number): Promise<any> {
        if (!clinicId) {
            throw new Error('Không có mã cơ sở y tế!');
        }
        return await this.medicalPackageRepository.getMedicalPackageByClinicId(
            clinicId,
        );
    }
    async createService(service: Service): Promise<any> {
        return this.medicalPackageRepository.createService(service);
    }
    async updateService(service: Service): Promise<any> {
        return this.medicalPackageRepository.updateService(service);
    }
    async deleteService(id: number): Promise<any> {
        return this.medicalPackageRepository.deleteService(id);
    }
    async getServiceById(id: number): Promise<any> {
        return this.medicalPackageRepository.getServiceById(id);
    }
    async updateViewService(id: number): Promise<any> {
        return this.medicalPackageRepository.updateViewService(id);
    }
    async viewService(
        pageIndex: number | null,
        pageSize: number | null,
        clinicId: number | null,
        categoryId: number | null,
        startPrice: number | null,
        endPrice: number | null,
    ): Promise<any> {
        return this.medicalPackageRepository.viewService(
            pageIndex ?? null,
            pageSize ?? null,
            clinicId ?? null,
            categoryId ?? null,
            startPrice ?? null,
            endPrice ?? null,
        );
    }
    async getCommonService(): Promise<any> {
        return this.medicalPackageRepository.getCommonService();
    }
}
