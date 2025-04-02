import { injectable } from 'tsyringe';
import { DegreesService } from '../services/degrees.service';
import { Request, Response } from 'express';
@injectable()
export class DegreesController {
    constructor(private degreesService: DegreesService) {}
    async getAllDegrees(req: Request, res: Response): Promise<void | Response> {
        try {
            const data = await this.degreesService.getAllDegrees();
            if (!data) {
                return res.status(404).json({ message: 'Không có dữ liệu !' });
            }
            res.status(200).json(data);
        } catch (err: Error | any) {
            res.status(500).json({ message: err.message });
        }
    }
}
