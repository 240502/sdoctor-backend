import { injectable } from 'tsyringe';
import { SupportStaffService } from '../services/support_staff.service';
import { Request, Response } from 'express';
import {
    SupportStaffCreateDTO,
    SupportStaffUpdateDTO,
} from '../models/support_staff';

@injectable()
export class SupportStaffController {
    constructor(private supportStaffService: SupportStaffService) {}
    async getSupportStaffById(
        req: Request,
        res: Response,
    ): Promise<Response | void> {
        try {
            const employeeId: string = req.params.employeeId;
            const result =
                await this.supportStaffService.getSupportStaffById(employeeId);
            if (!result) {
                return res.status(404).json({ message: 'Not found' });
            }
            res.status(200).json(result);
        } catch (err: any) {
            res.status(400).json({
                message: err.message,
            });
        }
    }
    async getSupportStaffs(
        req: Request,
        res: Response,
    ): Promise<Response | void> {
        try {
            const { pageIndex, pageSize, searchContent } =
                req.query as unknown as {
                    pageIndex: number;
                    pageSize: number;
                    searchContent: string;
                };

            const results = await this.supportStaffService.getSupportStaffs(
                pageIndex,
                pageSize,
                searchContent,
            );

            if (!results) {
                return res.status(404).json({ message: 'Not found' });
            }
            res.status(200).json({
                pageCount: Math.ceil(results[0]?.totalRow / pageSize),
                data: results,
                pageIndex: pageIndex,
                pageSize: pageSize,
            });
        } catch (err: any) {
            res.status(400).json({
                message: err.message,
            });
        }
    }

    async createSupportStaff(req: Request, res: Response): Promise<void> {
        try {
            const supportStaff: SupportStaffCreateDTO =
                req.body as SupportStaffCreateDTO;
            const result =
                await this.supportStaffService.createSupportStaff(supportStaff);
            res.status(201).json({ message: 'created successfully', result });
        } catch (err: any) {
            res.status(400).json({ message: err.message, result: false });
        }
    }

    async updateSupportStaff(req: Request, res: Response): Promise<void> {
        try {
            const supportStaff: SupportStaffUpdateDTO =
                req.body as SupportStaffUpdateDTO;
            const result =
                await this.supportStaffService.updateSupportStaff(supportStaff);
            res.status(200).json({ message: 'updated successful', result });
        } catch (err: any) {
            res.status(400).json({ message: err.message, result: false });
        }
    }

    async deleteSupportStaff(req: Request, res: Response): Promise<void> {
        try {
            const id: number = Number(req.params.id);
            const result =
                await this.supportStaffService.deleteSupportStaff(id);
            res.status(200).json({
                message: 'deleted successfully',
                result: result,
            });
        } catch (err: any) {
            res.status(400).json({ message: err.message, result: false });
        }
    }
}
