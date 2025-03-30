import { injectable } from 'tsyringe';
import { HomeDirectoryService } from '../services/home_directory.service';
import { HomeDirectory } from '../models/home_directory';
import { Request, Response } from 'express';
@injectable()
export class HomeDirectoryController {
    constructor(private homeDirectoryService: HomeDirectoryService) {}
    async getHomeDirectory(req: Request, res: Response): Promise<void> {
        try {
            const result = await this.homeDirectoryService.getHomeDirectory();
            if (result.length > 0 && Array.isArray(result)) {
                res.json(result);
            } else
                res.status(404).json({ message: 'Không tồn tại bản ghi nào' });
        } catch (err: any) {
            res.json({ message: err.message });
        }
    }
}
