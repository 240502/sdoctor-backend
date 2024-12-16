import { injectable } from 'tsyringe';
import { Database } from '../config/database';
import { Service } from '../models/service';

@injectable()
export class ServiceRepository {
    constructor(private db: Database) {}
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
    async updateViewService(id: number): Promise<any> {
        try {
            const sql = 'CALL UpdateViewService(?,@err_code,@err_msg)';
            await this.db.query(sql, [id]);
            return true;
        } catch (err: any) {
            throw new Error(err);
        }
    }
    async getServiceById(id: number): Promise<any> {
        try {
            const sql = 'CALL GetServiceById(?,@err_code,@err_msg)';
            const [results] = await this.db.query(sql, [id]);
            if (Array.isArray(results) && results.length > 0) {
                return results[0];
            } else return null;
        } catch (err: any) {
            throw new Error(err);
        }
    }
    async viewService(
        pageIndex: number,
        pageSize: number,
        clinicId: number,
        categoryId: number,
    ): Promise<any> {
        try {
            const sql = 'CALL ViewService(?,?,?,?,@err_code,@err_msg)';
            const [results] = await this.db.query(sql, [
                pageIndex,
                pageSize,
                clinicId,
                categoryId,
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
}
