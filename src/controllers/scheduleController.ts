import { injectable } from 'tsyringe';
import { ScheduleService } from '../services/scheduleService';
import { Schedule } from '../models/schedule';
import { Request, Response } from 'express';
@injectable()
export class ScheduleController {
    constructor(private scheduleService: ScheduleService) {}
    async createSchedule(req: Request, res: Response): Promise<void> {
        try {
            const schedule: Schedule = req.body as Schedule;
            await this.scheduleService.createSchedule(schedule);
            res.json({ message: 'Created successfully', result: true });
        } catch (err: any) {
            res.json({ message: err.message });
        }
    }
    async updateSchedule(req: Request, res: Response): Promise<void> {
        try {
            const { id, time } = req.body;
            await this.scheduleService.updateSchedule(id, time);
            res.json({ message: 'Updated successfully', result: true });
        } catch (err: any) {
            res.json({ message: err.message });
        }
    }
    async deleteSchedule(req: Request, res: Response): Promise<void> {
        try {
            const id: number = Number(req.params.id);
            await this.scheduleService.deleteSchedule(id);
            res.json({ message: 'Deleted successfully', result: true });
        } catch (err: any) {
            res.json({ message: err.message });
        }
    }
    async viewSchedule(req: Request, res: Response): Promise<void> {
        try {
            const { date, pageIndex, pageSize } = req.body;
            const data = await this.scheduleService.viewSchedule(
                date,
                pageIndex,
                pageSize,
            );
            if (data) {
                res.json({
                    totalItems: data[0].RecordCount,
                    page: pageIndex,
                    pageSize: pageSize,
                    data: data,
                    pageCount: Math.ceil(data[0].RecordCount / pageSize),
                    date: date,
                });
            } else {
                res.status(404).json({ message: 'Không có bản ghi nào!' });
            }
        } catch (err: any) {
            res.json({ message: err.message });
        }
    }
    async getScheduleByDateAndSubscriberId(
        req: Request,
        res: Response,
    ): Promise<void> {
        try {
            const { date, subscriberId, type } = req.body;
            const result =
                await this.scheduleService.getScheduleByDateAndSubscriberId(
                    date,
                    subscriberId,
                    type,
                );
            if (result) {
                res.json({
                    data: result,
                    date: date,
                    subscriberId: subscriberId,
                    type: type,
                });
            } else
                res.status(404).json({
                    message: 'Không tồn tại bản ghi !',
                });
        } catch (err: any) {
            res.json({ message: err.message });
        }
    }
}
