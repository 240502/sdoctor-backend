import { injectable } from 'tsyringe';
import { UserRepository } from '../repositories/userRepository';
import { User } from '../models/user';
var md5 = require('md5');

@injectable()
export class UserService {
    constructor(private userRepository: UserRepository) {}
    async login(email: string, password: string): Promise<any> {
        const md5_password = md5(password);
        console.log('md5_password', md5_password);
        return this.userRepository.login(email, md5_password);
    }

    async createAccount(userId: number, password: string): Promise<any> {
        const md5_password = md5(password);
        return this.userRepository.createAccount(userId, md5_password);
    }
    async resetPassword(userId: number): Promise<any> {
        const md5_password = md5('123456');
        return this.userRepository.createAccount(userId, md5_password);
    }
    async updateUserActiveStatus(userId: number, active: number): Promise<any> {
        return this.userRepository.updateUserActiveStatus(userId, active);
    }

    async createUser(user: User): Promise<any> {
        user.password = md5(user.password);
        return this.userRepository.createUser(user);
    }
    async updateUser(user: User): Promise<any> {
        return this.userRepository.updateUser(user);
    }
    async deleteUser(id: Number): Promise<any> {
        return this.userRepository.deleteUser(id);
    }
    async getUserById(id: number): Promise<any> {
        return this.userRepository.getUserById(id);
    }
    async ViewUser(
        pageIndex: number,
        pageSize: number,
        active: number,
    ): Promise<any> {
        return this.userRepository.ViewUser(pageIndex, pageSize, active);
    }
    async changePassword(
        id: number,
        currentPassword: string,
        newPassword: string,
    ): Promise<any> {
        const md5CurrentPassword = md5(currentPassword);
        const md5NewPassword = md5(newPassword);
        return this.userRepository.changePassword(
            id,
            md5CurrentPassword,
            md5NewPassword,
        );
    }
}
