import { injectable } from 'tsyringe';
import { UserRepository } from '../repositories/userRepository';
import { User } from '../models/user';
var md5 = require('md5');

@injectable()
export class UserService {
    constructor(private userRepository: UserRepository) {}
    async login(email: string, password: string): Promise<any> {
        const md5_password = md5(password);
        console.log(md5_password);
        return this.userRepository.login(email, md5_password);
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
    async ViewUser(pageIndex: number, pageSize: number): Promise<any> {
        return this.userRepository.ViewUser(pageIndex, pageSize);
    }
}
