import { injectable } from 'tsyringe';
import { Database } from '../config/database';
import { Major } from '../models/major';
@injectable()
export class MajorRepository {
    constructor(private db: Database) {}
  
}
