import { injectable } from 'tsyringe';
import { Database } from '../config/database';
import { Service } from '../models/service';

@injectable()
export class MedicalPackageRepository {
    constructor(private db: Database) {}

    async getMedicalPackageByClinicId(clinicId: number): Promise<any> {
        try {
            const sql =
                'CALL GetMedicalPackageByClinicId(?,@err_code,@err_msg)';
            const [res] = await this.db.query(sql, [clinicId]);
            if (res.length > 0 && Array.isArray(res)) {
                return res;
            }
            return null;
        } catch (err: Error | any) {
            throw err;
        }
    }
    async createService(service: Service): Promise<any> {
        try {
            const sql =
                'CALL CreateService(?,?,?,?,?,?,?,?,@err_code,@err_msg)';
            const newService = await this.db.query(sql, [
                service.name,
                service.summary,
                service.price,
                service.clinic_id,
                service.category_id,
                service.image,
                service.preparation_process,
                service.service_detail,
            ]);
            return newService;
        } catch (err: any) {
            throw new Error(err);
        }
    }
    async updateService(service: Service): Promise<any> {
        try {
            const sql =
                'CALL UpdateService(?,?,?,?,?,?,?,?,?,@err_code,@err_msg)';
            await this.db.query(sql, [
                service.id,
                service.name,
                service.summary,
                service.price,
                service.clinic_id,
                service.category_id,
                service.image,
                service.preparation_process,
                service.service_detail,
            ]);
            return true;
        } catch (err: any) {
            throw new Error(err);
        }
    }
    async deleteService(id: number): Promise<any> {
        try {
            const sql = 'CALL DeleteService(?,@err_code,@err_msg)';
            await this.db.query(sql, [id]);
            return true;
        } catch (err: any) {
            throw new Error(err);
        }
    }
    async updateMedicalPackageViews(id: number): Promise<any> {
        try {
            const sql = 'CALL UpdateMedicalPackageViews(?,@err_code,@err_msg)';
            await this.db.query(sql, [id]);
            return true;
        } catch (err: any) {
            throw new Error(err);
        }
    }
    async getMedicalPackageById(id: number): Promise<any> {
        try {
            const sql = 'CALL GetMedicalPackageById(?,@err_code,@err_msg)';
            const [results] = await this.db.query(sql, [id]);
            if (Array.isArray(results) && results.length > 0) {
                return results[0];
            } else return null;
        } catch (err: any) {
            throw new Error(err);
        }
    }
    async getMedicalPackagesWithPaginationAndOptions(
        offset: number | null,
        pageSize: number | null,
        clinicId: number | null,
        categoryIds: string | null,
        startPrice: number | null,
        endPrice: number | null,
        location: string | null,
    ): Promise<any> {
        try {
            const sql =
                'CALL GetMedicalPackagesWithPaginationAndOptions(?, ?, ?, ?, ?, ?,?, @err_code, @err_msg)';

            const [results] = await this.db.query(sql, [
                pageSize,
                offset,
                clinicId,
                categoryIds,
                startPrice,
                endPrice,
                location,
            ]);
            if (Array.isArray(results) && results.length > 0) {
                return results;
            } else {
                return null;
            }
        } catch (err: any) {
            throw new Error(err);
        }
    }
    async getCommonMedicalPackage(): Promise<any> {
        try {
            const sql = 'CALL GetCommonMedicalPackage(@err_code,@err_msg)';
            const [results] = await this.db.query(sql, []);
            if (Array.isArray(results) && results.length > 0) {
                return results;
            } else {
                return null;
            }
        } catch (err: any) {
            throw new Error(err);
        }
    }
}
