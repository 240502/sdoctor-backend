import { injectable } from 'tsyringe';
import { Database } from '../config/database';
import {
    MedicalEquipment,
    MedicalEquipmentCreateDto,
} from '../models/medical_equipment';

@injectable()
export class MedicalEquipmentRepository {
    constructor(private db: Database) {}

    async createMedicalEquipment(medicalEquipment: MedicalEquipmentCreateDto) {
        try {
            const sql = 'CALL CreateMedicalEquipment(?,?,@err_code,@err_msg)';
            const result = await this.db.query(sql, [
                medicalEquipment.clinicId,
                medicalEquipment.name,
            ]);
            return result;
        } catch (err: any) {
            throw err;
        }
    }
    async updateMedicalEquipment(medicalEquipment: MedicalEquipment) {
        try {
            const sql = 'CALL UpdateMedicalEquipment(?,?,@err_code,@err_msg)';
            const result = await this.db.query(sql, [
                medicalEquipment.id,
                medicalEquipment.name,
            ]);
            return result;
        } catch (err: any) {
            throw err;
        }
    }

    async deleteMedicalEquipment(id: number) {
        try {
            const sql = 'CALL DeleteMedicalEquipment(?,@err_code,@err_msg)';
            const result = await this.db.query(sql, [id]);
            return result;
        } catch (err: any) {
            throw err;
        }
    }

    async getMedicalEquipmentByClinicId(clinicId: number) {
        try {
            const sql =
                'CALL GetMedicalEquipmentByClinicId(?,@err_code,@err_msg)';
            const result = await this.db.query(sql, [clinicId]);
            return result;
        } catch (err: any) {
            throw err;
        }
    }
}
