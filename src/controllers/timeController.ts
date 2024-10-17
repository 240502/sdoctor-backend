import { injectable } from 'tsyringe';
import { Time } from '../models/time';
import { TimeService } from '../services/timeService';
import { Request, Response } from 'express';
@injectable()
export class TimeController {
    constructor(private timeService: TimeService) {}
    async getTimeById(req: Request, res: Response): Promise<void> {
        try {
            const id: number = Number(req.params.id);
            const result = await this.timeService.getTimeById(id);
            if (result) {
                res.json(result);
            } else
                res.status(404).json({
                    message: 'Không tồn tại bản ghi',
                    data: id,
                });
        } catch (err: any) {
            res.json({ message: err.message });
        }
    }
    async getTimeByTimeType(req: Request, res: Response): Promise<void> {
        try {
            const { timeType } = req.body;
            const result = await this.timeService.getTimeByTimeType(timeType);
            if (result) {
                res.json(result);
            } else
                res.status(404).json({
                    message: 'Không tồn tại bản ghi',
                });
        } catch (err: any) {
            res.json({ message: err.message });
        }
    }
}
