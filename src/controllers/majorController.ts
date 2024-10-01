import { injectable } from 'tsyringe';
import { MajorService } from '../services/majorService';
import { Major } from '../models/major';
import { Request, Response } from 'express';
@injectable()
export class MajorController {
    constructor(private majorService: MajorService) {}
    async getCommonMajor(req: Request, res: Response): Promise<void> {
        try {
            const result = await this.majorService.getCommonMajor();
            if (result.length > 0 && Array.isArray(result)) {
                res.json(result);
            } else
                res.status(404).json({ message: 'Không tồn tại bản ghi nào' });
        } catch (err: any) {
            res.json({ message: err.message });
        }
    }
}
