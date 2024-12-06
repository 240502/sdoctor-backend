import { injectable } from 'tsyringe';
import { UserService } from '../services/userService';
import { User } from '../models/user';
import { Request, Response } from 'express';
import { generateToken } from '../config/jwt';
const md5 = require('md5');
@injectable()
export class UserController {
    constructor(private userService: UserService) {}
    async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            const user = await this.userService.login(email, password);
            if (user) {
                const token = generateToken(user);
                user.token = token;
                res.status(200).json(user);
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
