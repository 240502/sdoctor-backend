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
    async getAllMajor(req: Request, res: Response): Promise<any> {
        try {
            const result = await this.majorService.getAllMajor();
            if (result.length > 0 && Array.isArray(result)) {
                res.json(result);
            } else
                res.status(404).json({ message: 'Không tồn tại bản ghi nào' });
        } catch (err: any) {
            res.json({ message: err.message });
        }
    }
    async getMajorById(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            const result = await this.majorService.getMajorById(id);
            if (result) {
                res.json(result);
            } else
                res.status(404).json({ message: 'Không tồn tại bản ghi nào' });
        } catch (err: any) {
            res.json({ message: err.message });
        }
    }
    async viewMajor(req: Request, res: Response): Promise<void> {
        try {
            const { pageIndex, pageSize } = req.body;
            const results = await this.majorService.viewMajor(
                pageIndex,
                pageSize,
            );
            if (results) {
                res.json({
                    pageIndex: pageIndex,
                    pageSize: pageSize,
                    data: results,
                    totalItems: results[0].RecordCount,
                    pageCount: Math.ceil(results[0].RecordCount / pageSize),
                });
            } else {
                res.status(404);
            }
        } catch (err: any) {
            res.json({ message: err.message });
        }
    }
}
