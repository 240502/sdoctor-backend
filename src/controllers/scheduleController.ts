import { injectable } from 'tsyringe';
import { ScheduleService } from '../services/schedule.service';
import { DoctorSchedule } from '../models/doctor_schedule';
import { Request, Response } from 'express';
@injectable()
export class ScheduleController {
    constructor(private scheduleService: ScheduleService) {}
    async updateScheduleStatus(req: Request, res: Response): Promise<void> {
        try {
            const { dataArr } = req.body;
            await this.scheduleService.updateScheduleStatus(dataArr);
            res.status(200).json('Update status successfully!');
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    }
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
    async viewSchedules(req: Request, res: Response): Promise<void> {
        try {
            const { entityId, date, entityType } = req.body;
            const data = await this.scheduleService.viewSchedules(
                entityId,
                date,
                entityType,
            );
            if (data) {
                res.json({
                    entityId: entityId,
                    data: data,
                    date: date,
                    entityType: entityType,
                });
            } else {
                res.status(404).json({ message: 'Không có bản ghi nào!' });
            }
        } catch (err: any) {
            res.json({ message: err.message });
        }
    }
    // async viewScheduleForClient(req: Request, res: Response): Promise<void> {
    //     try {
    //         const { date, subscriberId, type } = req.body;
    //         const result = await this.scheduleService.viewScheduleForClient(
    //             date,
    //             subscriberId,
    //             type,
    //         );
    //         if (result) {
    //             res.json({
    //                 data: result,
    //                 date: date,
    //                 subscriberId: subscriberId,
    //                 type: type,
    //             });
    //         } else
    //             res.status(404).json({
    //                 message: 'Không tồn tại bản ghi !',
    //             });
    //     } catch (err: any) {
    //         res.json({ message: err.message });
    //     }
    // }
    // async viewScheduleForDoctor(req: Request, res: Response): Promise<void> {
    //     try {
    //         const { date, doctor_id } = req.body;
    //         const result = await this.scheduleService.viewScheduleForDoctor(
    //             date,
    //             doctor_id,
    //         );
    //         if (result) {
    //             res.json({
    //                 data: result,
    //                 date: date,
    //                 doctor_id: doctor_id,
    //             });
    //         } else
    //             res.status(404).json({
    //                 message: 'Không tồn tại bản ghi !',
    //             });
    //     } catch (err: any) {
    //         res.json({ message: err.message });
    //     }
    // }
}
