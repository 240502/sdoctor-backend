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
    async getClinicView(
        pageIndex: number,
        pageSize: number,
        location: string | null,
    ): Promise<any> {
        return this.clinicRepository.getClinicView(
            pageIndex,
            pageSize,
            location,
        );
    }
    async getClinicById(id: number): Promise<any> {
        return this.clinicRepository.getClinicById(id);
    }
    async getQuantityClinic(): Promise<any> {
        return this.clinicRepository.getQuantityClinic();
    }
}
