import { injectable } from 'tsyringe';
import { HomeDirectoryRepository } from '../repositories/home_directoryRepository';
import { HomeDirectory } from '../models/home_directory';

@injectable()
export class HomeDirectoryService {
    constructor(private homeDirectoryRepository: HomeDirectoryRepository) {}
    async getHomeDirectory(): Promise<any> {
        return this.homeDirectoryRepository.getHomeDirectory();
    }
}
