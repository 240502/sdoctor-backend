import { StatusService } from '../services/statusService';
import { injectable } from 'tsyringe';
import { Request, Response } from 'express';
@injectable()
export class StatusController {
    constructor(private service: StatusService) {}

    async getAllStatus(req: Request, res: Response): Promise<void> {
        try {
            const results = await this.service.getAllStatus();
            res.json(results);
        } catch (err: any) {
            res.json({ message: err.message, results: false });
        }
    }
}
