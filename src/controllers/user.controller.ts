import { injectable } from 'tsyringe';
import { UserService } from '../services/user.service';
import { LoginResponse, User } from '../models/user';
import { Request, Response } from 'express';
import { generateToken } from '../config/jwt';
const md5 = require('md5');
@injectable()
export class UserController {
    constructor(private userService: UserService) {}

    async changePassword(req: Request, res: Response) {
        try {
            const { id, currentPassword, newPassword } = req.body;
            await this.userService.changePassword(
                id,
                currentPassword,
                newPassword,
            );
            res.json({ message: 'Suuccess', result: true });
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }
    async refreshToken(req: Request, res: Response): Promise<void> {
        try {
            const refreshToken = req.cookies.refreshToken; // Lấy refreshToken từ cookie
            if (!refreshToken) {
                res.status(400).json({ message: 'Refresh token is required' });
                return;
            }
            const results: any =
                await this.userService.refreshToken(refreshToken);

            // Cập nhật accessToken trong cookie
            res.cookie('accessToken', results.accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 15 * 60 * 1000, // 15 phút
            });

            res.status(200).json({
                message: 'Token refreshed successfully',
                user: results.user,
            });
        } catch (err: any) {
            res.status(403).json({
                message: 'Invalid refresh token',
                error: err.message,
            });
        }
    }
    async logout(req: Request, res: Response): Promise<void> {
        try {
            res.clearCookie('accessToken', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
            });
            res.clearCookie('refreshToken', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
            });
            res.status(200).json({
                message: 'Logged out successfully',
                result: true,
            });
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }

    async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            const results: LoginResponse = await this.userService.login(
                email,
                password,
            );
            if (results) {
                // Gửi accessToken và refreshToken trong cookies
                res.cookie('accessToken', results.accessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production', // Chỉ dùng secure trong production
                    sameSite: 'strict',
                    maxAge: 15 * 60 * 1000, // 15 phút
                });
                res.cookie('refreshToken', results.refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
                });
                res.status(200).json({
                    message: 'Login successful',
                    user: results.user,
                });
            } else {
                res.status(404).json({
                    message: 'Thông tin tài khoản không chính xác!',
                });
            }
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }
    async createUser(req: Request, res: Response): Promise<void> {
        try {
            const user = req.body as User;
            await this.userService.createUser(user);
            res.status(200).json({
                message: 'Successfully created',
                result: true,
            });
        } catch (err: any) {
            res.json({ message: err.message });
        }
    }
    async createAccount(req: Request, res: Response): Promise<void> {
        try {
            const formData = req.body as { userId: number; password: string };
            await this.userService.createAccount(
                formData.userId,
                formData.password,
            );
            res.status(200).json({
                message: 'created successfully',
                result: true,
            });
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }
    async updateUserActiveStatus(req: Request, res: Response): Promise<void> {
        try {
            const formData = req.body as { userId: number; active: number };
            await this.userService.updateUserActiveStatus(
                formData.userId,
                formData.active,
            );
            res.status(200).json({
                message: 'Updated successfully',
                result: true,
            });
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }
    async resetPassword(req: Request, res: Response): Promise<void> {
        try {
            const formData = req.body as { userId: number };
            await this.userService.resetPassword(formData.userId);
            res.status(200).json({
                message: 'Updated successfully',
                result: true,
            });
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }

    async updateUser(req: Request, res: Response): Promise<void> {
        try {
            const user = req.body as User;
            await this.userService.updateUser(user);
            res.status(200).json({
                message: 'Successfully updated',
                result: true,
            });
        } catch (err: any) {
            res.json({ message: err.message });
        }
    }
    async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const id: Number = Number(req.params.id);
            await this.userService.deleteUser(id);
            res.status(200).json({
                message: 'Successfully deleted',
                result: true,
            });
        } catch (err: any) {
            res.json({ message: err.message });
        }
    }
    async getUserById(req: Request, res: Response): Promise<void> {
        try {
            const id: number = Number(req.params.id);
            const result: User = await this.userService.getUserById(id);
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({ message: 'Bản ghi không tồn tại!' });
            }
        } catch (err: any) {
            res.json({ message: err.message });
        }
    }
    async viewUser(req: Request, res: Response): Promise<void> {
        try {
            const { pageIndex, pageSize, active } = req.body;
            const results = await this.userService.ViewUser(
                pageIndex,
                pageSize,
                active,
            );
            if (results) {
                res.json({
                    totalItems: results[0].RecordCount,
                    page: pageIndex,
                    pageSize: pageSize,
                    data: results,
                    pageCount: Math.ceil(results[0].RecordCount / pageSize),
                    active: active,
                });
            } else res.json({ message: 'Không tồn tại bản ghi nào!' });
        } catch (err: any) {
            res.json({ message: err.message });
        }
    }
}
