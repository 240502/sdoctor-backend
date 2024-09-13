import { injectable } from 'tsyringe';
import { Database } from '../config/database';
import { Time } from '../models/time';
@injectable()
export class TimeRepository {
    constructor(private db: Database) {}
  
}
