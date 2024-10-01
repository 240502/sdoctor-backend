import { injectable } from 'tsyringe';
import { HomeMenuRepository } from '../repositories/home_menuRepository';
import { HomeMenu } from '../models/home_menu';

@injectable()
export class HomeMenuService {
    constructor(private homeMenuRepository: HomeMenuRepository) {}
    async getHomeMenu(): Promise<any> {
        return this.homeMenuRepository.getHomeMenu();
    }
}
