import { injectable } from 'tsyringe';
import { Database } from '../config/database';
import { User } from '../models/user';
import { Functions } from '../models/functions';
@injectable()
export class UserRepository {
    constructor(private db: Database) {}

    async login(email: String, password: String): Promise<any> {
        try {
            const sql = 'CALL Login(?,@err_code,@err_msg)';
            const [results] = await this.db.query(sql, [email, password]);
            if (Array.isArray(results) && results.length > 0) {
                if (results[0].password === password) {
                    const functions = [];
                    for (let i = 0; i < results.length; i++) {
                        let model: Functions = {
                            id: Number(results[i].function_id),
                            function_name: results[i].function_name,
                            created_at: null,
                            updated_at: null,
                            parent_id: null,
                            icon: results[i].icon,
                            sort: null,
                            link: results[i].link,
                        };
                        functions.push(model);
                    }
                    const user: User = {
                        id: results[0].id,
                        full_name: results[0].full_name,
                        image: results[0].image,
                        phone: results[0].phone,
                        gender: results[0].gender,
                        address: results[0].address,
                        email: results[0].email,
                        password: results[0].password,
                        role_id: results[0].role_id,
                        created_at: results[0].created_at,
                        updated_at: results[0].updated_at,
                        created_by_user_id: results[0].created_by_user_id,
                        birthday: results[0].birthday,
                        functions: functions,
                        token: '',
                    };
                    return user;
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
