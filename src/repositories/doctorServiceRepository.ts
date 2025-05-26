import { injectable } from 'tsyringe';
import { Database } from '../config/database';
import {
    DoctorService,
    DoctorServiceCreateDTO,
    DoctorServiceUpdateDTO,
} from '../models/doctor_service';

@injectable()
export class DoctorServiceRepository {
    constructor(private db: Database) {}

    async createDoctorService(
        doctorService: DoctorServiceCreateDTO,
    ): Promise<any> {
        try {
            const sql = 'CALL CreateDoctorService(?,?,?,@err_code,@err_msg)';
            const result = await this.db.query(sql, [
                doctorService.doctorId,
                doctorService.serviceId,
                doctorService.customPrice,
            ]);
            return result;
        } catch (err: any) {
            throw new Error(err);
        }
    }

    async updateDoctorService(
        doctorService: DoctorServiceUpdateDTO,
    ): Promise<any> {
        try {
            const sql = 'CALL UpdateDoctorService(?,?,?,@err_code,@err_msg)';
            const result = await this.db.query(sql, [
                doctorService.id,
                doctorService.serviceId,
                doctorService.customPrice,
            ]);
            return result;
        } catch (err: any) {
            throw new Error(err);
        }
    }

    async deleteDoctorService(id: number): Promise<any> {
        try {
            const sql = 'CALL DeleteDoctorService(?,@err_code,@err_msg)';
            const result = await this.db.query(sql, [id]);
            return result;
        } catch (err: any) {
            throw new Error(err);
        }
    }

    async getDoctorServices(doctorId: number): Promise<DoctorService[] | null> {
        try {
            const sql = 'CALL GetDoctorServices(?,@err_code,@err_msg)';
            const [results] = await this.db.query(sql, [doctorId]);
            if (Array.isArray(results) && results.length > 0) {
                return results as DoctorService[];
            } else {
                return null;
            }
        } catch (err: any) {
            throw new Error(err);
        }
    }
}
