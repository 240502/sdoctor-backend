import { injectable } from 'tsyringe';
import { MedicalPackageRepository } from '../repositories/medical_packageRepository';
import {
    MedicalPackageUpdateDTO,
    MedicalPackageCreateDTO,
} from '../models/medical_package';

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
    async createService(service: MedicalPackageCreateDTO): Promise<any> {
        return this.medicalPackageRepository.createService(service);
    }
    async updateService(service: MedicalPackageUpdateDTO): Promise<any> {
        return this.medicalPackageRepository.updateService(service);
    }
    async deleteService(id: number): Promise<any> {
        return this.medicalPackageRepository.deleteService(id);
    }
    async getMedicalPackageById(id: number): Promise<any> {
        return this.medicalPackageRepository.getMedicalPackageById(id);
    }
    async updateMedicalPackageViews(id: number): Promise<any> {
        try {
            if (!id) {
                throw new Error('Thiếu mã gói y tế!');
            }
            return this.medicalPackageRepository.updateMedicalPackageViews(id);
        } catch (err: Error | any) {
            throw err;
        }
    }
    async getMedicalPackagesWithPaginationAndOptions(
        pageIndex: number | null,
        pageSize: number | null,
        clinicId: number | null,
        categoryIds: number[] | null,
        startPrice: number | null,
        endPrice: number | null,
        location: string | null,
    ): Promise<any> {
        let categoryIdStr: string = '';
        if (categoryIds && categoryIds.length > 0) {
            categoryIdStr = categoryIds.join(',');
        }
        let offset = 0;
        if (pageIndex && pageSize) {
            offset = (pageIndex - 1) * pageSize || 0;
        }
        return this.medicalPackageRepository.getMedicalPackagesWithPaginationAndOptions(
            offset ?? null,
            pageSize ?? null,
            clinicId ?? null,
            categoryIdStr !== '' ? categoryIdStr : null,
            startPrice ?? null,
            endPrice ?? null,
            location ?? null,
        );
    }
    async getCommonMedicalPackage(): Promise<any> {
        return this.medicalPackageRepository.getCommonMedicalPackage();
    }
}
