import { injectable } from 'tsyringe';
import { Database } from '../config/database';
import { Services } from '../models/services';
@injectable()
export class ServicesRepository {
    constructor(private db: Database) {}
  
}
