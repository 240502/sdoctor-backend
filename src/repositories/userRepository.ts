import { injectable } from 'tsyringe';
import { Database } from '../config/database';
@injectable()
export class UserRepository {
    constructor(private db: Database) {}
  
}
