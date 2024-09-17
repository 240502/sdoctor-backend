import { injectable } from 'tsyringe';
import { Database } from '../config/database';
import { User } from '../models/user';
@injectable()
export class UserRepository {
    constructor(private db: Database) {}

    async login(email: String, password: String): Promise<any> {
        try {
            const sql = 'CALL Login(?,@err_code,@err_msg)';
            const [results] = await this.db.query(sql, [email, password]);
            if (Array.isArray(results) && results.length > 0) {
                if (results[0].password === password) {
                    return results[0];
                } else return null;
            } else {
                return null;
            }
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
    async createUser(user: User): Promise<any> {
        try {
            const sql =
                'CALL CreateUser(?,?,?,?,?,?,?,?,?,?,@err_code,@err_msg)';
            await this.db.query(sql, [
                user.full_name,
                user.image,
                user.phone,
                user.gender,
                user.address,
                user.email,
                user.password,
                user.role_id,
                user.created_by_user_id,
                user.birthday,
            ]);
            return true;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
    async updateUser(user: User): Promise<any> {
        try {
            const sql =
                'CALL UpdateUser(?,?,?,?,?,?,?,?,?,?,?,?,@err_code,@err_msg)';
            await this.db.query(sql, [
                user.id,
                user.full_name,
                user.image,
                user.phone,
                user.gender,
                user.address,
                user.email,
                user.password,
                user.role_id,
                user.created_at,
                user.created_by_user_id,
                user.birthday,
            ]);
            return true;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
    async deleteUser(id: Number): Promise<any> {
        try {
            const sql = 'CALL DeleteUser(?,@err_code,@err_msg)';
            await this.db.query(sql, [id]);
            return true;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
    async getUserById(id: Number): Promise<any> {
        try {
            const sql = 'CALL GetUserById(?,@err_code,@err_msg)';
            const [results] = await this.db.query(sql, [id]);
            if (Array.isArray(results) && results.length > 0) {
                return results[0];
            } else return null;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
    async ViewUser(pageIndex: number, pageSize: number): Promise<any> {
        try {
            const sql = 'CALL ViewUser(?,?,@err_code,@err_msg)';
            const [results] = await this.db.query(sql, [pageIndex, pageSize]);
            if (Array.isArray(results) && results.length > 0) {
                return results;
            } else return null;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
}
