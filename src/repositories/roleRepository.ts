import { injectable } from 'tsyringe';
import { Database } from '../config/database';
@injectable()
export class RoleRepository {
    constructor(private db: Database) {}
  
}
