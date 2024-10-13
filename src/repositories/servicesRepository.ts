import { injectable } from 'tsyringe';
import { Database } from '../config/database';
import { Services } from '../models/services';
@injectable()
export class ServicesRepository {
    constructor(private db: Database) {}
    async createService(services: Services): Promise<any> {
        try {
            const sql = 'CALL CreateService(?,?,?,?,?,?,?,@err_code,@err_msg)';
            await this.db.query(sql, [
                services.name,
                services.description,
                services.price,
                services.clinic_id,
                services.category_id,
                services.image,
                services.introduction,
            ]);
            return true;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
    async updateService(services: Services): Promise<any> {
        try {
            const sql =
                'CALL UpdateService(?,?,?,?,?,?,?,?,?,@err_code,@err_msg)';
            await this.db.query(sql, [
                services.id,
                services.name,
                services.description,
                services.price,
                services.clinic_id,
                services.category_id,
                services.image,
                services.created_at,
                services.introduction,
            ]);
            return true;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
    async deleteService(id: number): Promise<any> {
        try {
            const sql = 'CALL DeleteService(?,@err_code,@err_msg)';
            await this.db.query(sql, [id]);
            return true;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
    async getServiceView(
        pageIndex: number,
        pageSize: number,
        categoryId: number | null,
        startPrice: number | null,
        endPrice: number | null,
        location: string | null,
        clinicId: number | null,
        name: string | null,
    ): Promise<any> {
        try {
            const sql =
                'CALL GetServicesView(?,?,?,?,?,?,?,?,@err_code,@err_msg)';
            const [results] = await this.db.query(sql, [
                pageIndex,
                pageSize,
                categoryId,
                startPrice,
                endPrice,
                location,
                clinicId,
                name,
            ]);
            if (Array.isArray(results) && results.length > 0) {
                return results;
            } else return null;
        } catch (err: any) {
            throw new Error(err.message);
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
            throw new Error(err.message);
        }
    }
    async getCommonService(): Promise<any> {
        try {
            const sql = 'CALL getCommonService(@err_code,@err_msg)';
            const [results] = await this.db.query(sql, []);
            if (Array.isArray(results) && results.length > 0) {
                return results;
            } else return null;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
}
