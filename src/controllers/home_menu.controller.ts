import { injectable } from 'tsyringe';
import { HomeMenuService } from '../services/home_menuService';
import { HomeMenu } from '../models/home_menu';
import { Request, Response } from 'express';
@injectable()
export class HomeMenuController {
    constructor(private homeMenuService: HomeMenuService) {}
    async getHomeMenu(req: Request, res: Response): Promise<void> {
        try {
            const result: HomeMenu[] = await this.homeMenuService.getHomeMenu();
            if (result.length > 0 && Array.isArray(result)) {
                res.json(result);
            } else
                res.status(404).json({ message: 'Không tồn tại bản ghi nào' });
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }
}
