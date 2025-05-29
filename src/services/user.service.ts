import { injectable } from 'tsyringe';
import { UserRepository } from '../repositories/userRepository';
import {
    User,
    TokenPayload,
    LoginResponse,
    UserUpdateDTO,
} from '../models/user';
import { config } from '../config/config';
var md5 = require('md5');
import jwt from 'jsonwebtoken';
@injectable()
export class UserService {
    constructor(private userRepository: UserRepository) {}

    async saveRefreshToken(
        userId: number,
        token: string,
        expiresAt: Date,
    ): Promise<void> {
        return this.userRepository.saveRefreshToken(userId, token, expiresAt);
    }

    async findRefreshToken(
        token: string,
    ): Promise<{ userId: number; token: string } | null> {
        return this.userRepository.findRefreshToken(token);
    }

    async refreshToken(
        refreshToken: string,
    ): Promise<{ accessToken: string; user: User }> {
        const storedToken = await this.findRefreshToken(refreshToken);
        if (!storedToken) {
            throw new Error('Invalid refresh token');
        }

        let payload: TokenPayload;
        try {
            payload = jwt.verify(
                refreshToken,
                config.jwt.secret!,
            ) as TokenPayload;
        } catch (error) {
            throw new Error('Invalid refresh token');
        }

        const user = await this.userRepository.getUserById(payload.id);
        if (!user) {
            throw new Error('User not found');
        }
        const accessToken = jwt.sign(
            { id: user.userId, email: user.email } as TokenPayload,
            config.jwt.secret!,
            { expiresIn: '15m' },
        );

        return {
            accessToken: accessToken,
            user: user,
        };
    }

    async login(email: string, password: string): Promise<any> {
        const md5_password = md5(password);
        console.log('mde 5', md5_password);

        const user = await this.userRepository.login(email, md5_password);
        const accessToken = jwt.sign(
            { id: user.userId, username: user.email } as TokenPayload,
            config.jwt.secret!,
            { expiresIn: '15m' },
        );
        const refreshToken = jwt.sign(
            { id: user.userId } as TokenPayload,
            config.jwt.secret!,
            { expiresIn: '7d' },
        );
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);
        await this.saveRefreshToken(user.userId, refreshToken, expiresAt);

        return { accessToken, refreshToken, user };
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
    async updateUser(user: UserUpdateDTO): Promise<any> {
        try {
            if (!user.id) {
                throw new Error('Thiếu tham số để cập nhật dữ liệu!');
            }
            return this.userRepository.updateUser(user);
        } catch (err: any) {
            throw err;
        }
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
