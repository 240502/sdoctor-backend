import { injectable } from 'tsyringe';
import { ClinicRepository } from '../repositories/clinicRepository';
import { Clinic } from '../models/clinic';
@injectable()
export class ClinicService {
    constructor(private clinicRepository: ClinicRepository) {}
    async createClinic(clinic: Clinic): Promise<any> {
        try {

            return this.clinicRepository.createClinic(clinic);
        } catch (err: any) {
            throw err;
        }
    }
    async updateClinic(clinic: Clinic): Promise<any> {
         try {
                
            return this.clinicRepository.updateClinic(clinic);
        } catch (err: any) {
            throw err;
        }
    }
    async deleteClinic(id: number): Promise<any> {
        try {
            if (!id) {
                throw new Error("Thiếu tham số để xóa !")
            }
            return this.clinicRepository.deleteClinic(id);
        } catch (err: any)
        {
            throw err;
        }
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
        try {
            if (!id) {
                throw new Error("Thiếu tham số !")
            }
            return this.clinicRepository.getClinicById(id);
        } catch (err: any)
        {
            throw err;
        }
    }
    async getQuantityClinic(): Promise<any> {
        return this.clinicRepository.getQuantityClinic();
    }
    async getCommonClinic(): Promise<any> {
        return this.clinicRepository.getCommonClinic();
    }
    async updateViewsClinic(id: number): Promise<any> {
        try {
            if (!id) {
                throw new Error("Thiếu tham số !")
            }
            return this.clinicRepository.updateViewsClinic(id);
        } catch (err: any)
        {
            throw err;
        }
    }
}
