import { injectable } from 'tsyringe';
import { ClinicRepository } from '../repositories/clinicRepository';
import { Clinic } from '../models/clinic';
@injectable()
export class ClinicService {
    constructor(private clinicRepository: ClinicRepository) {}
    async createClinic(clinic: Clinic): Promise<any> {
        return this.clinicRepository.createClinic(clinic);
    }
    async updateClinic(clinic: Clinic): Promise<any> {
        return this.clinicRepository.updateClinic(clinic);
    }
    async deleteClinic(id: number): Promise<any> {
        return this.clinicRepository.deleteClinic(id);
    }
    async getClinicsWithPaginationAndOptions(
        pageIndex: number | null,
        pageSize: number | null,
        departmentIds: number[] | null,
        location: string | null,
    ): Promise<any> {
        let departmentIdsStr: string | null = null;
        
        if (departmentIds && departmentIds.length > 0) {
            departmentIdsStr = departmentIds.join(',');
        }
        return this.clinicRepository.getClinicsWithPaginationAndOptions(
            pageIndex ?? null,
            pageSize ?? null,
            departmentIdsStr,
            location ?? null,
        );
    }
    async getClinicById(id: number): Promise<any> {
        return this.clinicRepository.getClinicById(id);
    }
    async getQuantityClinic(): Promise<any> {
        return this.clinicRepository.getQuantityClinic();
    }
    async getCommonClinic(): Promise<any> {
        return this.clinicRepository.getCommonClinic();
    }
    async updateViewsClinic(id: number): Promise<any> {
        return this.clinicRepository.updateViewsClinic(id);
    }
}
