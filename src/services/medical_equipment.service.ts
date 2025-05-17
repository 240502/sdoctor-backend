import { injectable } from 'tsyringe';
import { MedicalEquipmentRepository } from '../repositories/medical_equipmentRepository';
import {
    MedicalEquipment,
    MedicalEquipmentCreateDto,
} from '../models/medical_equipment';

@injectable()
export class MedicalEquipmentService {
    constructor(
        private medicalEquipmentRepository: MedicalEquipmentRepository,
    ) {}

    async createMedicalEquipment(medicalEquipment: MedicalEquipmentCreateDto) {
        try {
            if (!medicalEquipment.clinicId) {
                throw new Error('Thiếu mã cơ sở y tế');
            }
            if (!medicalEquipment.name || medicalEquipment.name === '') {
                throw new Error('Thiếu tên thiết bị');
            }
            return await this.medicalEquipmentRepository.createMedicalEquipment(
                medicalEquipment,
            );
        } catch (err: any) {
            throw err;
        }
    }
    async updateMedicalEquipment(
        medicalEquipment: MedicalEquipment,
    ): Promise<any> {
        try {
            if (!medicalEquipment.id) {
                throw new Error('Thiếu id');
            }
            if (!medicalEquipment.name || medicalEquipment.name === '') {
                throw new Error('Thiếu tên thiết bị');
            }
            const result =
                await this.medicalEquipmentRepository.updateMedicalEquipment(
                    medicalEquipment,
                );
            return result;
        } catch (err: any) {
            throw err;
        }
    }
    async deleteMedicalEquipment(id: number): Promise<any> {
        try {
            // Input validation
            if (!Number.isInteger(id) || id <= 0) {
                throw new Error('id phải là số nguyên dương');
            }

            // Call repository to delete record
            const result =
                await this.medicalEquipmentRepository.deleteMedicalEquipment(
                    id,
                );
            return result;
        } catch (err: any) {
            throw new Error(`Không thể xóa clinicSpecialty: ${err.message}`);
        }
    }

    async getMedicalEquipmentByClinicId(clinicId: number): Promise<any> {
        try {
            // Input validation
            if (!Number.isInteger(clinicId) || clinicId <= 0) {
                throw new Error('clinicId phải là số nguyên dương');
            }

            // Call repository to fetch records
            const result =
                await this.medicalEquipmentRepository.getMedicalEquipmentByClinicId(
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
