import { injectable } from 'tsyringe';
import { Database } from '../config/database';
import { Schedule } from '../models/schedule';
@injectable()
export class ScheduleRepository {
    constructor(private db: Database) {}
  
}
