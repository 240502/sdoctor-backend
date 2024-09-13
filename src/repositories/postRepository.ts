import { injectable } from 'tsyringe';
import { Database } from '../config/database';
@injectable()
export class PostRepository {
    constructor(private db: Database) {}
  
}
