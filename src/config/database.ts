import { Pool, PoolConnection, createPool } from 'mysql2/promise';
import { injectable } from 'tsyringe';
import { config } from './config';

//Cấu hình kết nối MYSQL

const connectionConfig = {
    host: config.db.host,
    port: config.db.port,
    user: config.db.username,
    password: config.db.password,
    database: config.db.database,
    timezone: 'Z', // Sử dụng UTC (Z) hoặc +07:00 nếu bạn muốn múi giờ cụ thể
};

@injectable()
export class Database {
    private pool: Pool;
    constructor() {
        this.pool = createPool(connectionConfig);
    }
    public async query(sql: string, values: any[]): Promise<any> {
        let connection: PoolConnection | null = null;
        try {
            connection = await this.pool.getConnection();
            const [results] = await connection.query(sql, values);
            const [outParam] = await connection.query(
                'SELECT @err_code,@err_msg',
            );

            const err: any = outParam;
            if (err[0]['@err_code'] === 0) {
                return results;
            } else if (err[0]['@err_code'] === -1) {
                return [];
            } else {
                throw new Error(err[0]['@err_msg']);
            }
        } catch (error: any) {
            throw error;
        } finally {
            if (connection) {
                connection.release();
            }
        }
    }
}
