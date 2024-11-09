import { injectable } from 'tsyringe';
import { ScheduleDetailsService } from '../services/schedule_detailsService';
import { ScheduleDetails } from '../models/schedule_details';
import { Request, Response } from 'express';
@injectable()
export class ScheduleDetailsController {
    constructor(private _scheduleDetailsService: ScheduleDetailsService) {}
    async createScheduleDetails(req: Request, res: Response): Promise<void> {
        try {
            const { scheduleId, scheduleDetails } = req.body;
            await this._scheduleDetailsService.createScheduleDetails(
                scheduleId,
                scheduleDetails,
            );
            res.json({
                message: 'Created successfully',
                scheduleDetails: scheduleDetails,
                scheduleId: scheduleId,
            });
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }
    async deleteScheduleDetails(req: Request, res: Response): Promise<void> {
        try {
            const { scheduleDetails } = req.body;
            await this._scheduleDetailsService.deleteScheduleDetails(
                scheduleDetails,
            );
            res.json({
                message: 'Deleted successfully',
                scheduleDetails: scheduleDetails,
            });
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }
    async getScheduleDetailsByScheduleId(
        req: Request,
        res: Response,
    ): Promise<void> {
        try {
            const scheduleId = Number(req.params.scheduleId);
            const result =
                await this._scheduleDetailsService.getScheduleDetailsByScheduleId(
                    scheduleId,
                );
            if (result) {
                res.json(result);
            } else
                res.status(404).json({
                    message: 'Không tồn tại bản ghi',
                    result: false,
                });
        } catch (err: any) {
            res.json(err.message);
        }
    }
    async updateAvailableScheduleDetails(
        req: Request,
        res: Response,
    ): Promise<void> {
        try {
            const scheduleDetailId: number = Number(
                req.params.scheduleDetailId,
            );
            await this._scheduleDetailsService.updateAvailableScheduleDetails(
                scheduleDetailId,
            );
            res.json({
                message: 'Sửa thành công!',
                result: true,
                scheduleDetailId: scheduleDetailId,
            });
        } catch (err: any) {
            res.json({ message: err.message });
        }
    }
}
