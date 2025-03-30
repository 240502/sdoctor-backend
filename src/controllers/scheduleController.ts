import { injectable } from 'tsyringe';
import { DoctorScheduleService } from '../services/doctorSchedule.service';
import { DoctorSchedule } from '../models/doctor_schedule';
import { Request, Response } from 'express';
@injectable()
export class DoctorScheduleController {
    constructor(private scheduleService: DoctorScheduleService) {}
    async createSchedule(req: Request, res: Response): Promise<void> {
        try {
            const newSchedule: DoctorSchedule = req.body as DoctorSchedule;
            const schedule =
                await this.scheduleService.createSchedule(newSchedule);
            res.json({ message: 'Created successfully', result: schedule });
        } catch (err: any) {
            res.json({ message: err.message });
        }
    }
    async updateSchedule(req: Request, res: Response): Promise<void> {
        try {
            const { id, scheduleDetails } = req.body;

            await this.scheduleService.updateSchedule(id, scheduleDetails);
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
    async viewScheduleForClient(req: Request, res: Response): Promise<void> {
        try {
            const { date, subscriberId, type } = req.body;
            const result = await this.scheduleService.viewScheduleForClient(
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
    async viewScheduleForDoctor(req: Request, res: Response): Promise<void> {
        try {
            const { date, doctor_id } = req.body;
            const result = await this.scheduleService.viewScheduleForDoctor(
                date,
                doctor_id,
            );
            if (result) {
                res.json({
                    data: result,
                    date: date,
                    doctor_id: doctor_id,
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
