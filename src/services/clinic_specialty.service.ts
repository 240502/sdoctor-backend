import { injectable } from 'tsyringe';
import { ClinicSpecialtyRepository } from '../repositories/clinic_specialtyRepository';
import { ClinicSpecialty } from '../models/clinic_specialty';

@injectable()
export class ClinicSpecialtyService {
    constructor(private clinicSpecialtyRepository: ClinicSpecialtyRepository) {}

    async createClinicSpecialty(
        clinicSpecialty: ClinicSpecialty,
    ): Promise<any> {
        try {
            // Input validation
            if (!clinicSpecialty) {
                throw new Error('Dữ liệu clinicSpecialty không được để trống');
            }

            if (
                !Number.isInteger(clinicSpecialty.clinicId) ||
                clinicSpecialty.clinicId <= 0
            ) {
                throw new Error('clinicId phải là số nguyên dương');
            }

            if (
                !Number.isInteger(clinicSpecialty.specialtyId) ||
                clinicSpecialty.specialtyId <= 0
            ) {
                throw new Error('specialtyId phải là số nguyên dương');
            }

            // Call repository to create record
            const result =
                await this.clinicSpecialtyRepository.createClinicSpecialty(
                    clinicSpecialty,
                );
            return result;
        } catch (err: any) {
            throw new Error(`Không thể tạo clinicSpecialty: ${err.message}`);
        }
    }

    async updateClinicSpecialty(
        clinicSpecialty: ClinicSpecialty,
    ): Promise<any> {
        try {
            // Input validation
            if (!clinicSpecialty) {
                throw new Error('Dữ liệu clinicSpecialty không được để trống');
            }

            if (
                !Number.isInteger(clinicSpecialty.id) ||
                clinicSpecialty.id <= 0
            ) {
                throw new Error('id phải là số nguyên dương');
            }

            if (
                !Number.isInteger(clinicSpecialty.specialtyId) ||
                clinicSpecialty.specialtyId <= 0
            ) {
                throw new Error('specialtyId phải là số nguyên dương');
            }

            // Call repository to update record
            const result =
                await this.clinicSpecialtyRepository.updateClinicSpecialty(
                    clinicSpecialty,
                );
            return result;
        } catch (err: any) {
            throw new Error(
                `Không thể cập nhật clinicSpecialty: ${err.message}`,
            );
        }
    }

    async deleteClinicSpecialty(id: number): Promise<any> {
        try {
            // Input validation
            if (!Number.isInteger(id) || id <= 0) {
                throw new Error('id phải là số nguyên dương');
            }

            // Call repository to delete record
            const result =
                await this.clinicSpecialtyRepository.deleteClinicSpecialty(id);
            return result;
        } catch (err: any) {
            throw new Error(`Không thể xóa clinicSpecialty: ${err.message}`);
        }
    }

    async getClinicSpecialtyByClinicId(clinicId: number): Promise<any> {
        try {
            // Input validation
            if (!Number.isInteger(clinicId) || clinicId <= 0) {
                throw new Error('clinicId phải là số nguyên dương');
            }

            // Call repository to fetch records
            const result =
                await this.clinicSpecialtyRepository.getClinicSpecialtyByClinicId(
                    clinicId,
                );
            return result;
        } catch (err: any) {
            throw new Error(
                `Không thể lấy danh sách clinicSpecialty: ${err.message}`,
            );
        }
    }
}
