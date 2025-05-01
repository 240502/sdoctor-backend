import { injectable } from 'tsyringe';
import { Database } from '../config/database';
import { User } from '../models/user';
import { Functions } from '../models/functions';
import md5 from 'md5';
@injectable()
export class UserRepository {
    constructor(private db: Database) {}

    async saveRefreshToken(
        userId: number,
        token: string,
        expiresAt: Date,
    ): Promise<void> {
        try {
            const sql = 'CALL SaveRefreshToken(?,?,?, @err_code, @err_msg)';
            await this.db.query(sql, [userId, token, expiresAt]);
        } catch (err: any) {
            throw new Error('Database error:' + err.message);
        }
    }
    async findRefreshToken(
        token: string,
    ): Promise<{ userId: number; token: string } | null> {
        try {
            const sql = 'CALL FindRefreshToken(?, @err_code, @err_msg)';
            const [results] = await this.db.query(sql, [token]);
            if (Array.isArray(results) && results.length > 0) {
                return { userId: results[0].userId, token: results[0].token };
            }
            return null;
        } catch (err: any) {
            throw new Error(`Database error: ${err.message}`);
        }
    }

    async login(email: String, password: String): Promise<any> {
        try {
            const sql = 'CALL Login(?,@err_code,@err_msg)';
            const [results] = await this.db.query(sql, [email]);
            if (Array.isArray(results) && results.length > 0) {
                if (results[0].password === password) {
                    const functions = [];
                    for (let i = 0; i < results.length; i++) {
                        let model: Functions = {
                            id: Number(results[i].function_id),
                            functionName: results[i].functionName,
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
                        userId: results[0].userId,
                        fullName: results[0].fullName,
                        image: results[0].image,
                        phone: results[0].phone,
                        gender: results[0].gender,
                        city: results[0].city,
                        district: results[0].district,
                        commune: results[0].commune,
                        email: results[0].email,
                        password: '',
                        roleId: results[0].roleId,
                        created_at: results[0].created_at,
                        updated_at: results[0].updated_at,
                        birthday: results[0].birthday,
                        functions: functions,
                        token: '',
                        active: results[0].active,
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
    async createAccount(userId: number, password: string): Promise<any> {
        try {
            const sql = 'CALL CreateAccount(?,?,@err_code,@err_msg)';
            await this.db.query(sql, [userId, password]);
            return true;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
    async updateUserActiveStatus(userId: number, active: number): Promise<any> {
        try {
            const sql = 'CALL UpdateUserActiveStatus(?,?,@err_code,@err_msg)';
            await this.db.query(sql, [userId, active]);
            return true;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
    async createUser(user: User): Promise<any> {
        try {
            const sql =
                'CALL CreateUser(?,?,?,?,?,?,?,?,?,?,?,@err_code,@err_msg)';
            await this.db.query(sql, [
                user.password,
                user.roleId,
                user.email,
                user.gender,
                user.phone,
                user.image,
                user.fullName,
                user.birthday,
                user.city,
                user.district,
                user.commune,
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
                user.userId,
                user.fullName,
                user.image,
                user.phone,
                user.gender,
                user.city,
                user.email,
                user.password,
                user.roleId,
                user.created_at,
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
    async ResetPassword(userId: number, password: string): Promise<any> {
        try {
            const sql = 'ResetPassword(?,?,@err_code,@err_msg)';
            await this.db.query(sql, [userId, password]);
            return true;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
    async ViewUser(
        pageIndex: number,
        pageSize: number,
        active: number,
    ): Promise<any> {
        try {
            const sql = 'CALL ViewUser(?,?,?,@err_code,@err_msg)';
            const [results] = await this.db.query(sql, [
                pageIndex,
                pageSize,
                active,
            ]);
            if (Array.isArray(results) && results.length > 0) {
                return results;
            } else return null;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
    async changePassword(
        id: number,
        currentPassword: string,
        newPassword: string,
    ): Promise<any> {
        try {
            const sql = 'CALL ChangePassword(?,?,?,@err_code,@err_msg)';
            await this.db.query(sql, [id, currentPassword, newPassword]);
            return true;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
}
